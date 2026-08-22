@navigation
Feature: Primary workspace navigation
  As an HR administrator
  I need to move between core HR workspaces
  So that I can complete day-to-day people operations

  Scenario Outline: Administrator opens a core workspace
    Given an administrator is working in the application
    When the administrator opens the "<module>" workspace
    Then the "<heading>" page is displayed

    Examples:
      | module    | heading   |
      | Admin     | Admin     |
      | PIM       | PIM       |
      | Leave     | Leave     |
      | Time      | Time      |
      | Directory | Directory |
      | Buzz      | Buzz      |

  Scenario: Administrator locates a workspace through menu search
    Given an administrator is working in the application
    When the administrator searches the menu for "Leave"
    Then only matching workspaces remain visible
