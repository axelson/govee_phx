defmodule GoveePhxApplication.BLESupervisor do
  @moduledoc false

  use Parent.GenServer

  def start_link(init_arg) do
    Parent.GenServer.start_link(__MODULE__, init_arg, name: __MODULE__, max_restarts: :infinity)
  end

  @impl GenServer
  def init(_init_arg) do
    children = [
      Parent.child_spec(child_spec(),
        ephemeral?: true,
        restart: :temporary,
        max_seconds: 5
      )
    ]

    Parent.start_all_children!(children)

    {:ok, nil}
  end

  @impl Parent.GenServer
  def handle_stopped_children(stopped_children, state) do
    Process.send_after(self(), {:restart, stopped_children}, :timer.seconds(5))

    {:noreply, state}
  end

  def handle_info({:restart, stopped_children}, state) do
    # NOTE: This logic isn't really correct
    # It only restarts the child process once
    # https://github.com/sasa1977/parent/issues/13
    try do
      Parent.child_spec(child_spec(),
        ephemeral?: true,
        restart: :temporary,
        max_seconds: 5
      )
      |> Parent.start_child()
    rescue
      error ->
        IO.inspect(error, label: "error")
    end

    # If this is used, then the child is restarted continuously
    # Parent.return_children(stopped_children)

    {:noreply, state}
  end

  def child_spec do
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

    Logger.info("GoveePhx starting Govee BLEConnection with #{inspect opts}")

    {Govee.BLEConnection, opts}
  end
end
