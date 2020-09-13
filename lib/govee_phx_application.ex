defmodule GoveePhxApplication do
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      GoveePhxWeb.Telemetry,
      {Phoenix.PubSub, name: GoveePhx.PubSub},
      {Govee.H6001Bulb, [type: :usb, configuration: %{vid: 0x0A5C, pid: 0x21E8}]},
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
end
