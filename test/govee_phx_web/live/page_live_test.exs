defmodule GoveePhxWeb.PageLiveTest do
  use GoveePhxWeb.ConnCase

  import Phoenix.LiveViewTest

  test "disconnected and connected render", %{conn: conn} do
    {:ok, page_live, disconnected_html} = live(conn, "/")
    assert disconnected_html =~ "Lights:"
    assert render(page_live) =~ "Lights:"
  end
end
