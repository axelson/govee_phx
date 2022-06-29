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

  @impl GenServer
  def handle_call(:get_conns, _from, state) do
    conns = GenServer.call(state.child_pid, :get_conns)

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
        :scenic -> transport_config
      end

    opts = [
      devices: Application.fetch_env!(:govee_phx, :govee_ble_devices),
      transport_config: transport_config
    ]

    case Application.fetch_env!(:govee_phx, :transport_type) do
      type when type in [:uart, :usb] ->
        Logger.info("GoveePhx starting Govee BLEConnection with #{inspect(opts)}")

        {Govee.BLEConnection, opts}

      :scenic ->
        IO.puts("starting with scenic")
        {GoveePhx.Scenic, opts}
    end
  end

  defp schedule_restart, do: Process.send_after(self(), :restart_child, :timer.seconds(300))

  defp enabled?, do: Application.fetch_env!(:govee_phx, :transport_type) != :disabled
end

defmodule GoveePhx.Scenic do
  use GenServer
  require Logger

  def start_link(opts, gen_server_opts \\ []) do
    GenServer.start_link(__MODULE__, opts, gen_server_opts)
  end

  @impl GenServer
  def init(opts) do
    IO.inspect(opts, label: "GoveePhx.Scenic opts (ble_supervisor.ex:103)")
    IO.inspect(self(), label: "GoveePhx.Scenic self() (ble_supervisor.ex:105)")
    devices = Keyword.get(opts, :devices)

    names =
      Enum.map(devices, fn device ->
        Keyword.get(device, :addr)
        |> to_string()
        |> String.to_atom()
      end)

    conns =
      Enum.map(names, fn name ->
        {:ok, conn} = GoveeScenic.run(name)
        conn
      end)

    {:ok, %{conns: conns}}
  end

  @impl GenServer
  def handle_call(:get_conns, _from, state) do
    {:reply, state.conns, state}
  end

  def handle_call({:add_device, %Govee.Device{} = device}, _from, state) do
    base_name = "govee_scenic_conn#{System.unique_integer([:positive, :monotonic])}"
    view_port_name = String.to_atom(base_name <> "_view_port")
    # TODO: Don't require this to be an atom
    window_name = String.to_atom(base_name <> "_window")

    Logger.debug(
      "Starting govee scenic device with name #{inspect(view_port_name)}/#{inspect(window_name)}"
    )

    {:ok, conn} = GoveeScenic.start_conn(view_port_name, window_name, device)

    state = %{state | conns: [conn | state.conns]}
    IO.puts("returning {:ok, conn}")
    {:reply, {:ok, conn}, state}
  end

  def handle_call({:remove_device, conn}, _from, state) do
    GoveeScenic.stop_conn(conn)

    conns = Enum.reject(state.conns, &(&1.name == conn.name))
    state = %{state | conns: conns}

    {:reply, :ok, state}
  end
end
