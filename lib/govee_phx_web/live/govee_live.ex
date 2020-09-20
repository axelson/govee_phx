defmodule GoveePhxWeb.GoveeLive do
  use GoveePhxWeb, :live_view
  require Logger

  alias Govee.CommonCommands
  alias Govee.BLEConnection

  @impl Phoenix.LiveView
  def mount(_params, _session, socket) do
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

  def handle_event(event, params, socket) do
    Logger.warn("Unhandled event \"#{event}\" with params: #{inspect(params)}")
    {:noreply, socket}
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
