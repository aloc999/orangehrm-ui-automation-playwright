@admin
Feature: System user administration
  As an HR administrator
  I need to locate application user accounts
  So that access can be reviewed

  Scenario: Built-in administrator account can be located
    Given an administrator is on the Admin workspace
    When system users are filtered by the built-in administrator username
    Then the administrator account is listed
