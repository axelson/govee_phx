defmodule GoveePhxApplication do
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      GoveePhxWeb.Telemetry,
      {Phoenix.PubSub, name: GoveePhx.PubSub},
      govee_ble(),
      GoveePhxWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: GoveePhx.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    GoveePhxWeb.Endpoint.config_change(changed, removed)
    :ok
  end

  def govee_ble do
    alias BlueHeron.HCI.Command.ControllerAndBaseband.WriteLocalName

    transport_config =
      Application.fetch_env!(:govee_phx, :transport_config)
      |> Map.put(:init_commands, [%WriteLocalName{name: "Govee Controller"}])

    transport_config =
      case Application.fetch_env!(:govee_phx, :transport_type) do
        :uart -> struct(BlueHeronTransportUART, transport_config)
        :usb -> struct(BlueHeronTransportUSB, transport_config)
      end

    opts = [
      devices: Application.fetch_env!(:govee_phx, :govee_ble_devices),
      transport_config: transport_config
    ]

    {Govee.BLEConnection, opts}
  end
end
