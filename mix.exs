defmodule GoveePhx.MixProject do
  use Mix.Project

  def project do
    [
      app: :govee_phx,
      version: "0.1.0",
      elixir: "~> 1.7",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
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
      {:exsync, path: "~/dev/forks/exsync", only: :dev},

      dep(:blue_heron, :github),
      dep(:blue_heron_transport_usb, :github),

      {:phoenix, "~> 1.5.4"},
      {:phoenix_live_view, "~> 0.15.0"},
      {:floki, ">= 0.0.0", only: :test},
      {:phoenix_html, "~> 2.11"},
      {:phoenix_live_reload, "~> 1.2", only: :dev},
      {:telemetry_metrics, "~> 0.4"},
      {:telemetry_poller, "~> 0.4"},
      {:gettext, "~> 0.11"},
      {:jason, "~> 1.0"},
      {:plug_cowboy, "~> 2.0"},
      {:parent, "~> 0.11"}
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
      setup: ["deps.get", "cmd npm install --prefix assets"]
    ]
  end

  defp dep(:govee, :github), do: {:govee, github: "axelson/govee"}
  defp dep(:govee, :path), do: {:govee, path: "~/dev/govee"}

  defp dep(:govee_semaphore, :github), do: {:govee_semaphore, github: "axelson/govee_semaphore"}
  defp dep(:govee_semaphore, :path), do: {:govee_semaphore, path: "~/dev/govee_semaphore"}

  defp dep(:blue_heron, :hex), do: {:blue_heron, ">= 0.0.0"}

  defp dep(:blue_heron, :github),
    do: {:blue_heron, github: "blue-heron/blue_heron", branch: "main", override: true}

  defp dep(:blue_heron, :path),
    do: {:blue_heron, path: "~/dev/forks/blue_heron/blue_heron", override: true}

  defp dep(:blue_heron_transport_usb, :hex), do: {:blue_heron_transport_usb, ">= 0.0.0", only: :dev}

  defp dep(:blue_heron_transport_usb, :github),
    do:
      {:blue_heron_transport_usb,
       github: "blue-heron/blue_heron_transport_usb", branch: "main", only: :dev, override: true}

  defp dep(:blue_heron_transport_usb, :path),
    do: {:blue_heron_transport_usb, path: "~/dev/forks/blue_heron/blue_heron_transport_usb", only: :dev, override: true}
end
