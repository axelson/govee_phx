import Config

config :govee_phx, GoveePhxWeb.Endpoint,
  # Binding to loopback ipv4 address prevents access from other machines.
  # Change to `ip: {0, 0, 0, 0}` to allow access from other machines.
  http: [
    ip: {127, 0, 0, 1},
    port: 4000,
    transport_options: [num_acceptors: 2]
  ],
  check_origin: false,
  code_reloader: true,
  debug_errors: true,
  secret_key_base: "tfkgoZ3qdAnnBtq660ZyjWhVXu+AzGje+d+wC5h6FSbVSB+tkhVsc5bPK7A6cBh8",
  watchers: [
    # Start the esbuild watcher by calling Esbuild.install_and_run(:default, args)
    esbuild: {Esbuild, :install_and_run, [:default, ~w(--sourcemap=inline --watch)]}
  ]

# Watch static and templates for browser reloading.
config :govee_phx, GoveePhxWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r"priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$",
      ~r"priv/gettext/.*(po)$",
      ~r"lib/govee_phx_web/(live|views)/.*(ex)$",
      ~r"lib/govee_phx_web/templates/.*(eex)$"
    ]
  ]

config :govee_phx,
  govee_ble_devices: [
    # [
    #   type: :h6001,
    #   addr: 0xA4C138EC49BD
    # ],

    # [
    #   type: :h6001,
    #   addr: 0xA4C1385184DA
    # ],
    # [
    #   type: :h6159,
    #   addr: 0xA4C138668E6F
    # ]
  ]

config :govee_phx,
  transport_config: %{},
  transport_type: :scenic

# config :govee_phx,
#   transport_config: %{
#     vid: 0x0A5C,
#     pid: 0x21E8
#   },
#   transport_type: :usb

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime

config :scenic, :assets, module: GoveeScenic.Assets

config :govee_scenic, :viewport,
  name: :main_viewport,
  size: {800, 600},
  theme: :dark,
  # Can we pass the default scene another way?
  default_scene: {GoveeScenic.Scene.Home, topic: "default_window"},
  drivers: [
    # TODO: See where a driver is being started
    # [
    #   module: Scenic.Driver.Local,
    #   name: :local,
    #   window: [resizeable: false, title: "govee_scenic"],
    #   on_close: :stop_system
    # ]
  ]
