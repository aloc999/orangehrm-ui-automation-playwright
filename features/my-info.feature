@my-info @profile
Feature: My Info profile picture
  As a logged-in user
  I need to update my profile picture from the My Info section
  So that my employee profile stays current

  Scenario: TC001 - Uploading a new profile picture shows a success message
    Given an administrator is on the My Info workspace
    When the profile picture is updated with a valid image
    # TC doc says "Successfully Saved"; app OS 5.9 actually returns "Successfully Updated".
    Then a success message "Successfully Updated" is displayed
