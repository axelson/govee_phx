import Config

# Configures the endpoint
config :govee_phx, GoveePhxWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "o3BDCy1862hqmkdyE7tMMrZDoUfLfty5U8JJXDEvmCAWj8ZqIUZmmuEmqxX5jBCv",
  render_errors: [view: GoveePhxWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: GoveePhx.PubSub,
  live_view: [signing_salt: "3J2S31Z1"]

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :govee_phx, GoveePhx.Mailer, adapter: Swoosh.Adapters.Local

# Swoosh API client is needed for adapters other than SMTP.
config :swoosh, :api_client, false

# Configure esbuild (the version is required)
config :esbuild,
  version: "0.14.0",
  default: [
    args:
      ~w(js/app.js --bundle --target=es2017 --outdir=../priv/static/assets --external:/fonts/* --external:/images/*),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id],
  handle_otp_reports: true,
  handle_sasl_reports: true

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :tailwind,
  version: "3.0.23",
  default: [
    args: ~w(
      --config=tailwind.config.js
      --input=css/app.css
      --output=../priv/static/assets/app.css
    ),
    cd: Path.expand("../assets", __DIR__)
  ]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
