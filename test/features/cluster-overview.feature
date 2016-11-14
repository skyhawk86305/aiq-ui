Feature: Per Single Cluster Overview
  As a User
  I want to see critical information about an individual cluster on one page
  So that I can see an overview of health, performance and capacity utilization

#  Assumptions:
#    Given user is authenticated
#    And I have access to cluster barCluster

  Scenario: Per Single Cluster Overview (CLOUD-3142)
    Given The app is open in a browser

    # Is this path actually 'cluster/<cluster_id>/reporting/overview'?
    # Do I use a mock cluster for this?
    When I navigate to the "cluster/reporting/overview" page

    # Cluster performance has IOPS and bandwidth line graphs
    Then I see a sf-time-series graph component with "clusterPerformance" data

    # Performance utilization has utilization line graphs
    And I see a sf-time-series graph component with "clusterPerformanceUtilization" data

    # Nodes, Block Capacity, Metadata Capacity, Efficiency, Utilization, IOPS, Bandwidth, Cluster Faults
    And I see a sf-infobar-widget
    And the "-node-count" widget contains the title "Nodes"
    And the "-block-capacity" widget contains the title "Block Capacity"
    And the "-metadata-capacity" widget contains the title "Metadata Capacity"
    And the "-efficiency" widget contains the title "Efficiency"
    And the "-utilization" widget contains the title "Utilization"
    And the "-iops" widget contains the title "IOPS"
    And the "-bandwidth" widget contains the title "Bandwidth"
    And the "-cluster-faults" widget contains the title "Cluster Faults"
    And the "Cluster Gaults" widget contains "Critical" and Error"

    And I see a SolidFire table with "activeIQAlerts" data
    And The "activeIQAlert" table contains columns: "Alert Triggered, Last Notified, Resolved, Policy Name, Severity, Alert Value, Destination, Alert Condition"
