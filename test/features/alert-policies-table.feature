Feature: Alert Policy Table
  As an AIQ user
  I can see the alert policies I have defined
  Because I can't remember why I ever wanted to receive so many emails.

#  Assumptions:
#    Given user is authenticated

  @alertPolicies
  Scenario: Feeding data from ListNotifications to sf-table (CLOUD-2900)
    When I navigate to the "dashboard/alerts/policies/" page
    Then I see a SolidFire table with "alertPolicy" data
    And The "alertPolicy" table contains columns: "Alert Policy Name, Destination, Severity, Creator, Customer, Cluster, Alert Condition"
    And The "alertPolicy" table contains "ListNotifications" data with attrs: "notificationName, destinationEmail, notificationSeverity, username, customerName, clusterName, policyDescription"
