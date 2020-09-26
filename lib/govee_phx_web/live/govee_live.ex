defmodule GoveePhxWeb.GoveeLive do
  use GoveePhxWeb, :live_view
  require Logger

  alias Govee.CommonCommands
  alias Govee.BLEConnection

  @meeting_in_progress_color 0xFF0000
  @meeting_finished_color 0x0D9106
  @note_color 0x45FFF3

  @impl Phoenix.LiveView
  def mount(_params, _session, socket) do
    socket = assign(socket, note: Notes.get_note())
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

  def handle_event("meeting:start", _, socket) do
    Task.start_link(fn ->
      flash_color_3_times(@meeting_in_progress_color)
    end)

    {:noreply, socket}
  end

  def handle_event("meeting:finish", _, socket) do
    Task.start_link(fn ->
      flash_color_3_times(@meeting_finished_color)
    end)

    {:noreply, socket}
  end

  def handle_event("update", params, socket) do
    note = params["note"]
    socket = assign(socket, :note, note)
    Notes.set_note(note)

    {:noreply, socket}
  end

  def handle_event("note:submit", _params, socket) do
    Notes.submit_note()
    CommonCommands.turn_on() |> run_command()
    CommonCommands.set_color(@note_color) |> run_command()

    {:noreply, socket}
  end

  def handle_event("note:clear", _params, socket) do
    socket = assign(socket, :note, nil)
    Notes.clear_note()

    {:noreply, socket}
  end

  def handle_event(event, params, socket) do
    Logger.warn("Unhandled event \"#{event}\" with params: #{inspect(params)}")
    {:noreply, socket}
  end

  defp flash_color_3_times(color) do
    CommonCommands.turn_on() |> run_command()
    CommonCommands.set_color(color) |> run_command()

    Process.sleep(1_000)
    CommonCommands.turn_off() |> run_command()

    Process.sleep(300)

    CommonCommands.turn_on() |> run_command()
    CommonCommands.set_color(color) |> run_command()
    Process.sleep(1_000)

    CommonCommands.turn_off() |> run_command()
    Process.sleep(300)

    CommonCommands.turn_on() |> run_command()
    CommonCommands.set_color(color) |> run_command()
    Process.sleep(1_000)

    CommonCommands.turn_off() |> run_command()
    Process.sleep(300)

    CommonCommands.turn_on() |> run_command()
    CommonCommands.set_color(color) |> run_command()
  end

  defp run_command(command) do
    for_each_device(fn device ->
      CommonCommands.send_command(command, device.att_client)
    end)
  end

  defp for_each_device(fun) when is_function(fun, 1) do
    Enum.each(BLEConnection.connected_devices(Server), fun)
  end
end
