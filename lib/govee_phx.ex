defmodule GoveePhx do
  @moduledoc """
  GoveePhx keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  def party_mode do
    GoveePhxApplication.BLESupervisor.get_conns()
    |> Enum.each(fn conn ->

      command = Govee.Command.set_color(0x8E59FF)
      GoveePhxApplication.BLESupervisor.execute_command(command, conn)

      command = Govee.Command.turn_on()
      GoveePhxApplication.BLESupervisor.execute_command(command, conn)
    end)
  end

  def all_off do
    GoveePhxApplication.BLESupervisor.get_conns()
    |> Enum.each(fn conn ->
      GoveePhxApplication.BLESupervisor.execute_command(Govee.Command.turn_off(), conn)
    end)
  end
end
