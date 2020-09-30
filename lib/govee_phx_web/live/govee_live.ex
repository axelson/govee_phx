defmodule GoveePhxWeb.GoveeLive do
  use GoveePhxWeb, :live_view
  require Logger

  alias Govee.CommonCommands
  alias Govee.BLEConnection

  @meeting_in_progress_color 0xFF0000
  @meeting_finished_color 0x0D9106

  @impl Phoenix.LiveView
  def mount(_params, _session, socket) do
    if connected?(socket) do
      :ok = GoveeSemaphore.subscribe()
    end

    socket = assign(socket, note: GoveeSemaphore.get_note())
    {:ok, socket}
  end

  @impl Phoenix.LiveView
  def handle_event("off", _, socket) do
    CommonCommands.turn_off()
    |> run_command()

    {:noreply, socket}
  end

  def handle_event("on", _, socket) do
    CommonCommands.turn_on()
    |> run_command()

    {:noreply, socket}
  end

  def handle_event("color", %{"hex" => "#" <> hex_str}, socket) do
    {hex, ""} = Integer.parse(hex_str, 16)

    CommonCommands.set_color(hex)
    |> run_command()

    {:noreply, socket}
  end

  def handle_event("brightness", %{"value" => value}, socket) do
    CommonCommands.set_brightness(value)
    |> run_command()

    {:noreply, socket}
  end

  def handle_event("white-slider", %{"value" => value}, socket) do
    value = value / 100
    CommonCommands.set_white(value) |> run_command()

    {:noreply, socket}
  end

  def handle_event("meeting:start", _, socket) do
    GoveeSemaphore.start_meeting()

    {:noreply, socket}
  end

  def handle_event("meeting:finish", _, socket) do
    GoveeSemaphore.finish_meeting()

    {:noreply, socket}
  end

  def handle_event("update", params, socket) do
    note = params["note"]
    socket = assign(socket, :note, note)
    GoveeSemaphore.set_note(note)

    {:noreply, socket}
  end

  def handle_event("note:submit", _params, socket) do
    GoveeSemaphore.submit_note()

    {:noreply, socket}
  end

  def handle_event("note:clear", _params, socket) do
    socket = assign(socket, :note, nil)
    GoveeSemaphore.clear_note()

    {:noreply, socket}
  end

  def handle_event(event, params, socket) do
    Logger.warn("Unhandled event \"#{event}\" with params: #{inspect(params)}")
    {:noreply, socket}
  end

  @impl Phoenix.LiveView
  def handle_info({:notes, :submit_note, note}, socket) do
    socket = assign(socket, note: note)
    {:noreply, socket}
  end

  def handle_info(event, socket) do
    Logger.warn("Unhandled event: #{inspect event}")
    {:noreply, socket}
  end

  def run_command(command) do
    for_each_device(fn device ->
      CommonCommands.send_command(command, device.att_client)
    end)
  end

  defp for_each_device(fun) when is_function(fun, 1) do
    Enum.each(BLEConnection.connected_devices(Server), fun)
  end

  defp render_note(:empty), do: nil
  defp render_note(note), do: note
end
