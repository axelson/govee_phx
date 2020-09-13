# GoveePhx

A simple Phoenix LiveView interface to a Govee H6001 LED bulb. Built with
[BlueHeron](https://github.com/smartrent/blue_heron/). The code to actually
control the govee H6001 can be found at https://github.com/axelson/govee

![screenshot](screenshot.png)

## Running

Pre-req: after first compiling, run `./contrib/fix-perms.sh`

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Install Node.js dependencies with `npm install --prefix assets`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.
