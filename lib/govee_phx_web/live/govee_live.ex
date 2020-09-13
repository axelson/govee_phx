defmodule GoveePhxWeb.GoveeLive do
  use GoveePhxWeb, :live_view

  alias Govee.H6001Bulb

  @impl Phoenix.LiveView
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def handle_event("off", _, socket) do
    H6001Bulb.turn_off(H6001Bulb)
    {:noreply, socket}
  end

  def handle_event("on", _, socket) do
    H6001Bulb.turn_on(H6001Bulb)
    {:noreply, socket}
  end
end
