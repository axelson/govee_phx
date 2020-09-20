defmodule GoveePhx.StateServer do
  use GenServer

  defmodule State do
    use TypedStruct

    typedstruct(enforce: true) do
      field :note, String.t(), default: nil
    end
  end

  def start_link(opts, genserver_opts \\ []) do
    genserver_opts = Keyword.put_new(genserver_opts, :name, __MODULE__)
    GenServer.start_link(__MODULE__, opts, genserver_opts)
  end

  def set_note(note) do
    GenServer.call(__MODULE__, {:set_note, note})
  end

  def clear_note do
    GenServer.call(__MODULE__, :clear_note)
  end

  def get_note do
    GenServer.call(__MODULE__, :get_note)
  end

  def submit_note do
    GenServer.call(__MODULE__, :submit_note)
  end

  @impl GenServer
  def init(_opts) do
    state = %State{}
    {:ok, state}
  end

  @impl GenServer
  def handle_call({:set_note, note}, _from, state) do
    state = %State{state | note: note}
    {:reply, :ok, state}
  end

  def handle_call(:clear_note, _from, state) do
    state = %State{state | note: nil}
    {:reply, :ok, state}
  end

  def handle_call(:get_note, _from, state) do
    {:reply, state.note, state}
  end

  def handle_call(:submit_note, _from, state) do
    # TODO: Notify of note update via pubsub? Registry?
    {:reply, :ok, state}
  end
end
