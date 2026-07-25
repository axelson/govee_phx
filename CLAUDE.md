# GoveePhx

Phoenix LiveView web interface for controlling Govee H6001 LED bulbs over BLE.

## Commands

- `mix deps.get` — install dependencies
- `mix phx.server` — start dev server at localhost:4000
- `mix test` — run all tests
- `mix test path/to/test.exs` — run a single test file
- `mix test path/to/test.exs:42` — run a single test by line number

## Architecture

- Elixir/Phoenix 1.7 app with Phoenix LiveView
- BLE communication via BlueHeron; device control logic in the `govee` library
- `GoveePhxApplication` — OTP app entry point, starts supervision tree including `BleSupervisor`
- `GoveePhx.ScenicThing` — bridge between Govee Scenic and Phoenix
- `GoveePhxWeb.GoveeLive` / `GoveePhxWeb.GoveeControlsComponent` — main LiveView UI
- `GoveePhxWeb.PageLive` — landing page
