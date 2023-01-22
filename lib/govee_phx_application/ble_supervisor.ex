# GenServer (via Parent) that manages the connections to the Govee devices
# Reads the transport config to know what type of connections to start (scenic, uart, usb)
defmodule GoveePhxApplication.BLESupervisor do
  @moduledoc false

  use Parent.GenServer
  require Logger

  defmodule State do
    defstruct [:child_pid, :configured_devices]
  end

  def start_link(init_arg) do
    Parent.GenServer.start_link(__MODULE__, init_arg, name: __MODULE__)
  end

  def add_device(device) do
    GenServer.call(GoveePhxApplication.BLESupervisor, {:add_device, device})
  end

  def remove_device(conn) do
    GenServer.call(GoveePhxApplication.BLESupervisor, {:remove_device, conn})
  end

  def get_conns do
    GenServer.call(GoveePhxApplication.BLESupervisor, :get_conns)
    |> List.flatten()
  end

  def execute_command(command, conn) do
    GenServer.call(GoveePhxApplication.BLESupervisor, {:execute_command, command, conn})
  end

  @impl GenServer
  def init(_init_arg) do
    children = children()

    [child_pid] = Parent.start_all_children!(children)

    {:ok, %State{child_pid: child_pid}}
  end

  @impl Parent.GenServer
  def handle_stopped_children(_stopped_children, state) do
    schedule_restart()

    {:noreply, state}
  end

  # This is a little funky, but this starts a stopped child
  def handle_info(:restart_child, state) do
    state =
      Parent.child_spec(child_spec(),
        ephemeral?: true,
        restart: :temporary,
        max_seconds: 5
      )
      |> Parent.start_child()
      |> case do
        {:error, _} ->
          schedule_restart()
          state

        {:ok, child_pid} ->
          Logger.info("restarted child_pid: #{inspect(child_pid, pretty: true)}")
          %State{state | child_pid: child_pid}
          nil
      end

    {:noreply, state}
  end

  @impl GenServer
  def handle_call(:get_conns, _from, state) do
    # TODO: This is breaking encapsulation a bit
    # FIXME: I think the Govee.BLECOnnectionManager is being started twice!
    Logger.info("govee_phx get_conns from parent to #{inspect(state.child_pid)}")
    conns = GenServer.call(state.child_pid, :get_conns)
    IO.inspect(conns, label: "got conns (ble_supervisor.ex:79)")

    {:reply, conns, state}
  end

  def handle_call({:add_device, device}, _from, state) do
    state = %State{state | configured_devices: [device | state.configured_devices]}

    result = GenServer.call(state.child_pid, {:add_device, device})

    {:reply, result, state}
  end

  def handle_call({:remove_device, conn}, _from, state) do
    result = GenServer.call(state.child_pid, {:remove_device, conn})
    {:reply, result, state}
  end

  def handle_call({:execute_command, command, conn}, _from, state) do
    # It's a little odd that we don't check that we "own" this conn here
    device = conn.raw_device

    result =
      case transport_type() do
        :uart -> GenServer.call(state.child_pid, {:execute_command, command, device})
        :usb -> GenServer.call(state.child_pid, {:execute_command, command, device})
        :scenic -> GenServer.call(state.child_pid, {:execute_command, command, conn})
      end

    {:reply, result, state}
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
      case transport_type() do
        :uart -> struct(BlueHeronTransportUART, transport_config)
        :usb -> struct(BlueHeronTransportUSB, transport_config)
        :scenic -> transport_config
      end

    opts = [
      devices: Application.fetch_env!(:govee_phx, :govee_ble_devices),
      transport_config: transport_config
    ]

    case Application.fetch_env!(:govee_phx, :transport_type) do
      type when type in [:uart, :usb] ->
        Logger.info("GoveePhx starting Govee.BLEConnectionManager with #{inspect(opts)}")

        # FIXME: the phx application shouldn't be the one starting this up
        {Govee.BLEConnectionManager, opts}

      :scenic ->
        {GoveePhx.ScenicThing, opts}
    end
  end

  defp transport_type, do: Application.fetch_env!(:govee_phx, :transport_type)

  defp schedule_restart, do: Process.send_after(self(), :restart_child, :timer.seconds(300))

  defp enabled?, do: Application.fetch_env!(:govee_phx, :transport_type) != :disabled
end
