@smoke @session
Feature: Session termination
  As an HR administrator
  I need to end my session when I leave the workstation
  So that the next person cannot act on my behalf

  Scenario: Administrator signs out of the application
    Given an administrator is working in the application
    When the administrator signs out
    Then the login page remains displayed
