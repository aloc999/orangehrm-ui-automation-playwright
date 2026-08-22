@guest @smoke @authentication
Feature: Administrator authentication
  As an HR administrator
  I need to prove my identity before using the system
  So that workforce data stays protected

  Scenario: Administrator signs in with valid credentials
    Given the OrangeHRM login page is displayed
    When the administrator signs in with valid credentials
    Then the workforce dashboard is displayed

  Scenario: Sign-in is rejected for unrecognized credentials
    Given the OrangeHRM login page is displayed
    When a user signs in with unrecognized credentials
    Then an authentication failure is shown
    And the login page remains displayed

  Scenario: Sign-in is blocked when credentials are missing
    Given the OrangeHRM login page is displayed
    When a user attempts to sign in without providing credentials
    Then required-field validation is shown
    And the login page remains displayed
