defmodule GoveePhx.MixProject do
  use Mix.Project

  def project do
    [
      app: :govee_phx,
      version: "0.1.0",
      elixir: "~> 1.12",
      elixirc_paths: elixirc_paths(Mix.env()),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {GoveePhxApplication, []},
      extra_applications: [:sasl, :logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      dep(:govee, :github),
      dep(:govee_semaphore, :github),
      # {:govee_scenic, path: "~/dev/govee_scenic"},
      {:govee_scenic, github: "axelson/govee_scenic"},
      {:exsync, path: "~/dev/forks/exsync", only: :dev},
      dep(:blue_heron, :hex),
      dep(:blue_heron_transport_usb, :hex),
      {:parent, "~> 0.11"},
      {:tailwind, "~> 0.1", runtime: Mix.env() == :dev},
      {:data_tracer, path: "~/dev/data_tracer", override: true},

      # Phoenix deps
      {:phoenix, "~> 1.7.0"},
      {:phoenix_view, "~> 2.0"},
      {:phoenix_html, "~> 4.0"},
      {:phoenix_html_helpers, "~> 1.0"},
      {:phoenix_live_reload, "~> 1.2", only: :dev},
      {:phoenix_live_view, "~> 0.20"},
      {:floki, ">= 0.30.0", only: :test},
      {:phoenix_live_dashboard, "~> 0.7"},
      {:esbuild, "~> 0.3", runtime: Mix.env() == :dev},
      {:swoosh, "~> 1.3"},
      {:telemetry_metrics, "~> 0.6"},
      {:telemetry_poller, "~> 1.0"},
      {:gettext, "~> 0.18"},
      {:jason, "~> 1.2"},
      {:plug_cowboy, "~> 2.5"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to install project dependencies and perform other setup tasks, run:
  #
  #     $ mix setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      setup: ["deps.get", "ecto.setup"],
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate --quiet", "test"],
      "assets.deploy": ["esbuild default --minify", "phx.digest"]
    ]
  end

  defp dep(:govee, :github), do: {:govee, github: "axelson/govee", branch: "new-update"}
  defp dep(:govee, :path), do: {:govee, path: "~/dev/govee", override: true}

  defp dep(:govee_semaphore, :github), do: {:govee_semaphore, github: "axelson/govee_semaphore"}
  defp dep(:govee_semaphore, :path), do: {:govee_semaphore, path: "~/dev/govee_semaphore"}

  defp dep(:govee_scenic, :github), do: {:govee_scenic, github: "axelson/govee_scenic"}

  # defp dep(:govee_scenic, :path, opts \\ []), do: {:govee_scenic, Keyword.merge(path: "~/dev/govee_scenic", opts)}

  defp dep(:blue_heron, :hex), do: {:blue_heron, ">= 0.0.0", override: true}

  defp dep(:blue_heron, :github),
    do: {:blue_heron, github: "blue-heron/blue_heron", branch: "main", override: true}

  defp dep(:blue_heron, :path),
    do: {:blue_heron, path: "~/dev/forks/blue_heron/blue_heron", override: true}

  defp dep(:blue_heron_transport_usb, :hex),
    do: {:blue_heron_transport_usb, ">= 0.0.0", only: :dev}

  defp dep(:blue_heron_transport_usb, :github),
    do:
      {:blue_heron_transport_usb,
       github: "blue-heron/blue_heron_transport_usb", branch: "main", only: :dev, override: true}

  defp dep(:blue_heron_transport_usb, :path),
    do:
      {:blue_heron_transport_usb,
       path: "~/dev/forks/blue_heron/blue_heron_transport_usb", only: :dev, override: true}
end
