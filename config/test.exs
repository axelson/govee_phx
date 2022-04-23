import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :govee_phx, GoveePhxWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "Pfn9A6XQZ/a3wQp3vqMh/JA8fW1Zz3WQx1v5wFL+6pJTahOgNJol2n5J+nteRCQP",
  server: false

# In test we don't send emails.
config :govee_phx, GoveePhx.Mailer, adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
