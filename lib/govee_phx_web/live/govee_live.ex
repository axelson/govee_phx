defmodule GoveePhxWeb.GoveeLive do
  use GoveePhxWeb, :live_view
  require Logger

  @impl Phoenix.LiveView
  def mount(_params, _session, socket) do
    if connected?(socket) do
      :ok = GoveeSemaphore.subscribe()
    end

    conns = GoveePhxApplication.BLESupervisor.get_conns()

    socket = assign(socket, conns: conns)
    {:ok, socket}
  end

  @impl Phoenix.LiveView
  def handle_event("add_device", _, socket) do
    device =
      Govee.Device.new!(
        type: :h6001,
        addr: Govee.Device.random_addr()
      )

    # TODO: no raw genserver call
    {:ok, conn} = GoveePhxApplication.BLESupervisor.add_device(device)
    socket = assign(socket, conns: [conn | socket.assigns.conns])

    {:noreply, socket}
  end

  def handle_event("remove_device_" <> conn_name, _, socket) do
    {to_remove, conns} =
      Enum.split_with(socket.assigns.conns, fn conn -> to_string(conn.name) == conn_name end)

    socket =
      case to_remove do
        [conn] ->
          :ok = GoveePhxApplication.BLESupervisor.remove_device(conn)
          assign(socket, conns: conns)

        [] ->
          socket
      end

    {:noreply, socket}
  end

  def handle_event(event, params, socket) do
    Logger.warn("#{__MODULE__} Unhandled event \"#{event}\" with params: #{inspect(params)}")
    {:noreply, socket}
  end

  @impl Phoenix.LiveView
  def handle_info({:govee_semaphore, :submit_note, note}, socket) do
    socket = assign(socket, note: note)
    {:noreply, socket}
  end

  def handle_info(event, socket) do
    Logger.warn("#{__MODULE__} Unhandled message: #{inspect(event)}")
    {:noreply, socket}
  end

  def execute_command(command, conn) do
    GoveePhxApplication.BLESupervisor.execute_command(command, conn)
  end

  # Might not be necessary but it feels odd to have `:` in an HTML ID
  defp id(conn) do
    String.replace(conn.name, ":", "_")
  end
end
