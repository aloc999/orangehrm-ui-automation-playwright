@pim
Feature: Employee records
  As an HR administrator
  I need to register and review people in the PIM workspace
  So that the employee master data stays current

  Scenario: A new employee can be added to the organization
    Given an administrator is on the PIM workspace
    When a new employee is registered
    Then the employee personal details are displayed

  Scenario: The employee list can be reviewed
    Given an administrator is on the PIM workspace
    When the employee list is requested
    Then employee records are displayed
