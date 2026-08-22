@directory
Feature: Corporate directory
  As an HR administrator
  I need a searchable people directory
  So that colleagues can be found without leaving the HR system

  Scenario: Corporate directory can be opened
    Given an administrator is on the Directory workspace
    When the corporate directory is loaded
    Then directory records or an empty-state message is shown
