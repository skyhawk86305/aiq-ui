Feature: Node Table
  As an AIQ user
  I want to see the active nodes in my cluster
  So that I can see GCCompleted

#  Assumptions:
#    Given user is authenticated
#    Given user has access to cluster X

@nodes
  Scenario: Feeding data from ListActiveNodes to sf-table (CLOUD-2898)
    When I navigate to the "cluster/11/nodes/" page
    Then I see a SolidFire table with "node" data
    And The "node" table contains columns: "ID, Name, Type, Version, Service Tag, Management IP, Cluster IP, Storage IP, Replication Port"
    And The "node" table contains "ListActiveNodes" data with attrs: "nodeID, name, nodeType, softwareVersion, serviceTag, mip, cip, sip, ipcPort"

