@leave
Feature: Leave records
  As an HR administrator
  I need to review leave activity
  So that absence decisions can be made from current data

  Scenario: Leave list can be reviewed for a recent period
    Given an administrator is on the Leave workspace
    When leave records are requested for a recent period
    Then the leave results view is displayed
