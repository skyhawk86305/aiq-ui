Feature: Drive Table
  As an AIQ user
  I want to see the active drives in my cluster
  So that I can see GCCompleted

#  Assumptions:
#    Given user is authenticated
#    Given user has access to cluster X

  @drives
  Scenario: Feeding data from ListActiveNodes to sf-table (CLOUD-2898)
    When I navigate to the "cluster/11/drives/" page
    Then I see a SolidFire table with "drive" data
    And The "drive" table contains columns: "ID, Node ID, Slot, Capacity, Serial, Wear, Reserve, Type"
#    And The "drive" table contains "ListActiveDrives" data with attrs: "driveID, nodeID, slot, capacity, serial, lifeRemainingPercent, reserveCapacityPercent, type"
