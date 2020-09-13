defmodule GoveePhxWeb.GoveeLive do
  use GoveePhxWeb, :live_view
  require Logger

  alias Govee.H6001Bulb

  @impl Phoenix.LiveView
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl Phoenix.LiveView
  def handle_event("off", _, socket) do
    H6001Bulb.turn_off(H6001Bulb)
    {:noreply, socket}
  end

  def handle_event("on", _, socket) do
    H6001Bulb.turn_on(H6001Bulb)
    {:noreply, socket}
  end

  def handle_event("color", %{"hex" => "#" <> hex_str}, socket) do
    {hex, ""} = Integer.parse(hex_str, 16)

    H6001Bulb.set_color(H6001Bulb, hex)
    {:noreply, socket}
  end

  def handle_event("brightness", %{"value" => value}, socket) do
    H6001Bulb.set_brightness(H6001Bulb, value)
    {:noreply, socket}
  end

  def handle_event(event, params, socket) do
    Logger.warn("Unhandled event \"#{event}\" with params: #{inspect(params)}")
    {:noreply, socket}
  end
end
