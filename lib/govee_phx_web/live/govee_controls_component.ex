defmodule GoveePhxWeb.GoveeControlsComponent do
  use GoveePhxWeb, :live_component

  @impl Phoenix.LiveComponent
  def render(assigns) do
    ~H"""
    <div id={"comp-id-#{id(@conn)}"}>
      <div class="hero"><%= @conn.name %></div>

      <div class="bg-slate-200 rounded-lg p-2">
        <div class="p-1">
          <button
            phx-click="on"
            phx-target={@myself}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            On
          </button>
          <button
            phx-click="off"
            phx-target={@myself}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Off
          </button>
        </div>

        <div class="p-1">
          <button
            id={"color-selector-#{id(@conn)}"}
            data-jscolor="{
        onChange: 'update(this, \'#pr1\')',
        onInput: 'update(this)',
      }"
            phx-update="ignore"
            phx-hook="ColorSelector"
            phx-target={@myself}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Select Color
          </button>
        </div>

        <div class="p-1">
          Brightness:
          <input
            class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
            id={"brightness-slider-#{id(@conn)}"}
            phx-hook="BrightnessSlider"
            phx-target={@myself}
            type="range"
            min="1"
            max="255"
            step="1"
            value="100"
          />
        </div>

        <div class="p-1">
          White light:
          <input
            class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
            id={"white-slider-#{id(@conn)}"}
            phx-hook="WhiteSlider"
            type="range"
            min="-100"
            max="100"
            step="1"
            value="0"
          />
        </div>

        <div class="m-5"></div>

        <h1>Meeting Controls</h1>

        <div class="p-1">
          <button
            phx-click="meeting:start"
            phx-target={@myself}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Start
          </button>
          <button
            phx-click="meeting:finish"
            phx-target={@myself}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Finish
          </button>
        </div>
        <div>
          <button
            phx-click={"remove_device_#{@conn.name}"}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Remove Device
          </button>
        </div>
      </div>
    </div>
    """
  end

  @impl Phoenix.LiveComponent
  def handle_event("on", _params, socket) do
    Govee.Command.turn_on()
    |> execute_command(socket.assigns.conn)

    {:noreply, socket}
  end

  def handle_event("off", _params, socket) do
    Govee.Command.turn_off()
    |> execute_command(socket.assigns.conn)

    {:noreply, socket}
  end

  def handle_event("color", params, socket) do
    %{"hex" => "#" <> hex_str} = params
    {hex, ""} = Integer.parse(hex_str, 16)

    Govee.Command.set_color(hex)
    |> execute_command(socket.assigns.conn)

    {:noreply, socket}
  end

  def handle_event("brightness", params, socket) do
    %{"value" => value} = params

    Govee.Command.set_brightness(value)
    |> execute_command(socket.assigns.conn)

    {:noreply, socket}
  end

  def handle_event("white-slider", params, socket) do
    %{"value" => value} = params
    value = value / 100

    Govee.Command.set_white(value)
    |> execute_command(socket.assigns.conn)

    {:noreply, socket}
  end

  def handle_event("meeting:start", _, socket) do
    GoveeSemaphore.start_meeting(socket.assigns.conn)

    {:noreply, socket}
  end

  def handle_event("meeting:finish", _, socket) do
    GoveeSemaphore.finish_meeting(socket.assigns.conn)

    {:noreply, socket}
  end

  def execute_command(command, conn) do
    GoveePhxApplication.BLESupervisor.execute_command(command, conn)
  end

  defp id(conn) do
    String.replace(conn.name, ":", "_")
    # String.replace(conn.name, "_", ":")
  end
end
