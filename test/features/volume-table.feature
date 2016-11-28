Feature: Drive Table
  As an AIQ user
  I want to see the active volumes in my cluster
  So that I can see GCCompleted

#  Assumptions:
#    Given user is authenticated
#    Given user has access to cluster X

  @volumes
  Scenario: Feeding data from ListActiveVolumes to sf-table (CLOUD-2898)
    When I navigate to the "cluster/11/volumes/" page
    Then I see a SolidFire table with "volume" data
    And The "volume" table contains columns: "ID, Account ID, Volume Size, 512e, Access, Min IOPS, Max IOPS, Burst IOPS, Paired, Configured Access Protocols"
    And The "volume" table contains "ListActiveVolumes" data with attrs: "volumeID, accountID, totalSize, enable512e, access, minIOPS, maxIOPS, burstIOPS, paired, configuredAccessProtocols"
