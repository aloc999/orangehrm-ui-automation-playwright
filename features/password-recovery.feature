@guest @password-recovery
Feature: Password recovery
  As a user who cannot sign in
  I need a way to start a password reset
  So that I can recover access without calling support

  Scenario: User can open the reset-password journey
    Given the OrangeHRM login page is displayed
    When the user chooses to reset a forgotten password
    Then the reset password form is displayed

  Scenario: Password reset can be cancelled
    Given the OrangeHRM login page is displayed
    When the user chooses to reset a forgotten password
    And the user cancels password recovery
    Then the login page remains displayed
