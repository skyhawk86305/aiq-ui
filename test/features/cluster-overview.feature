Feature: Per Single Cluster Overview
  As a User
  I want to see critical information about an individual cluster on one page
  So that I can see an overview of health, performance and capacity utilization

#  Assumptions:
#    Given user is authenticated
#    And I have access to cluster barCluster

  Scenario: Per Single Cluster Overview (CLOUD-3142)
    Given The app is open in a browser

    When I navigate to the "cluster/11/reporting/overview" page

    Then I see a sf-time-series graph component with "clusterPerformance" data

    And I see a sf-time-series graph component with "clusterPerformanceUtilization" data

    # Nodes, Block Capacity, Metadata Capacity, Efficiency, Utilization, IOPS, Bandwidth, Cluster Faults
    And I see a sf-infobar-widget

    And the sf-infobar-widget has "8" widgets

    And the sf-infobar-widget contains "Nodes, Block Capacity, "Metadata Capacity, Efficiency, Utilization, IOPS, Bandwidth, Cluster Faults"

    And the "Cluster Faults" widget contains "Critical, Error" badges

    And I see a SolidFire table with "activeIQAlerts" data
    And The "activeIQAlert" table contains columns: "Alert Triggered, Last Notified, Resolved, Policy Name, Severity, Alert Value, Destination, Alert Condition"
