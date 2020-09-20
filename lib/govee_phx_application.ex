defmodule GoveePhxApplication do
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      GoveePhxWeb.Telemetry,
      {Phoenix.PubSub, name: GoveePhx.PubSub},
      govee_ble(),
      GoveePhx.StateServer,
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

    opts = [
      devices: [
        [
          type: :h6001,
          addr: 0xA4C138EC49BD
        ],
        [
          type: :h6159,
          addr: 0xA4C138668E6F
        ]
      ],
      transport_config: %BlueHeronTransportUSB{
        vid: 0x0A5C,
        pid: 0x21E8,
        init_commands: [%WriteLocalName{name: "Govee Controller"}]
      }
    ]

    # Govee.BLEConnection.start_link(opts, name: Server)
    {Govee.BLEConnection, opts}
  end
end
