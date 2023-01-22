# What does this do? It is a GenServer that tracks what devices there are
defmodule GoveePhx.ScenicThing do
  use GenServer
  require Logger

  def start_link(opts, gen_server_opts \\ []) do
    GenServer.start_link(__MODULE__, opts, gen_server_opts)
  end

  @impl GenServer
  def init(opts) do
    devices = Keyword.get(opts, :devices)

    names =
      Enum.map(devices, fn device ->
        Keyword.get(device, :addr)
        |> to_string()
        |> String.to_atom()
      end)

    conns =
      Enum.map(names, fn _name ->
        # Probably need to call GoveeScenic.start_conn but I haven't figured out
        # how I want to pass the viewport and window name
        raise "Starting up with configured devices is not fully implemented"
      end)


    {:ok, %{conns: conns}}
  end

  @impl GenServer
  def handle_call(:get_conns, _from, state) do
    conns = Enum.map(state.conns, &Govee.ConnBuilder.build/1)
    IO.inspect(conns, label: "built conns (scenic_thing.ex:34)")
    {:reply, conns, state}
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
    {:reply, {:ok, Govee.ConnBuilder.build(conn)}, state}
  end

  def handle_call({:remove_device, conn}, _from, state) do
    GoveeScenic.stop_conn(conn)

    conns = Enum.reject(state.conns, &(&1.name == conn.name))
    state = %{state | conns: conns}

    {:reply, :ok, state}
  end

  def handle_call({:execute_command, command, conn}, _from, state) do
    GoveeScenic.execute_command(conn.raw_device, command)
    {:reply, :ok, state}
  end
end
