require "application_system_test_case"

class PressesTest < ApplicationSystemTestCase
  setup do
    @press = presses(:one)
  end

  test "visiting the index" do
    visit presses_url
    assert_selector "h1", text: "Presses"
  end

  test "should create press" do
    visit presses_url
    click_on "New press"

    click_on "Create Press"

    assert_text "Press was successfully created"
    click_on "Back"
  end

  test "should update Press" do
    visit press_url(@press)
    click_on "Edit this press", match: :first

    click_on "Update Press"

    assert_text "Press was successfully updated"
    click_on "Back"
  end

  test "should destroy Press" do
    visit press_url(@press)
    click_on "Destroy this press", match: :first

    assert_text "Press was successfully destroyed"
  end
end
