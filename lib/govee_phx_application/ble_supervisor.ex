defmodule GoveePhxApplication.BLESupervisor do
  @moduledoc false

  use Parent.GenServer
  require Logger

  def start_link(init_arg) do
    Parent.GenServer.start_link(__MODULE__, init_arg, name: __MODULE__)
  end

  @impl GenServer
  def init(_init_arg) do
    children = children()

    Parent.start_all_children!(children)

    {:ok, nil}
  end

  @impl Parent.GenServer
  def handle_stopped_children(_stopped_children, state) do
    schedule_restart()

    {:noreply, state}
  end

  def handle_info(:restart_child, state) do
    Parent.child_spec(child_spec(),
      ephemeral?: true,
      restart: :temporary,
      max_seconds: 5
    )
    |> Parent.start_child()
    |> case do
      {:error, _} ->
        schedule_restart()

      :ok ->
        nil
    end

    {:noreply, state}
  end

  def children do
    if enabled?() do
      [
        Parent.child_spec(child_spec(),
          ephemeral?: true,
          restart: :temporary,
          max_seconds: 5
        )
      ]
    else
      []
    end
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

    Logger.info("GoveePhx starting Govee BLEConnection with #{inspect(opts)}")

    {Govee.BLEConnection, opts}
  end

  defp schedule_restart, do: Process.send_after(self(), :restart_child, :timer.seconds(300))

  defp enabled?, do: Application.fetch_env!(:govee_phx, :transport_type) != :disabled
end
