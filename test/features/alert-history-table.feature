Feature: Alert History Table
  As an AIQ user
  I can see the alert history for clusters I can see
  Because I can't remember why I ever wanted to receive so many emails

#  Assumptions:
#    Given user is authenticated
#    Given user has access to cluster X

  @alerts
  Scenario: Feeding data from ListAlerts to sf-table (CLOUD-2902)
    When I navigate to the "dashboard/alerts/history/" page
    Then I see a SolidFire table with "alertHistory" data
    And The "alertHistory" table contains columns: "Alert ID, Alert Triggered, Last Notification, Resolved, Resolution Time, Alert Policy Name, Alert Severity, Alert Value, Destination, Customer, Cluster, Alert Condition"
    And The "alertHistory" table contains "ListAlerts" data with attrs: "id, created, lastNotified, isResolved, resolved, notificationName, severity, value, destinationEmail, customerName, clusterName, policyDescription"
