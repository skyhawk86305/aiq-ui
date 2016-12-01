Feature: Per Single Cluster Overview
  As a User
  I want to see critical information about an individual cluster on one page
  So that I can see an overview of health, performance and capacity utilization

#  Assumptions:
#    Given user is authenticated
#    And I have access to cluster barCluster

  @clusteroverview
  Scenario: Per Single Cluster Overview (CLOUD-3142)
    Given The app is open in a browser
    When I navigate to the "cluster/11/reporting/overview" page
    Then I see a sf-time-series graph component with "clusterPerformance" data
    And I see a sf-time-series graph component with "performanceUtilization" data

    Then I see a sf-infobar-widget
    And The sf-infobar-widget has "8" widgets

    Then I see a SolidFire table with "clusterAlert" data
    And The "clusterAlert" table contains columns: "Alert Triggered, Last Notified, Resolved, Severity, Policy Name, Alert Value, Destination, Alert Condition"
