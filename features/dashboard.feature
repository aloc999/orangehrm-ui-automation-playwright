@smoke @dashboard
Feature: Workforce dashboard
  As an HR administrator
  I need a landing overview after sign-in
  So that I can see key workforce signals immediately

  Scenario: Dashboard widgets are presented after sign-in
    Given an administrator is working in the application
    Then the dashboard widgets are visible
