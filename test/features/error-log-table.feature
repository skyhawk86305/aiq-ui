Feature: Error Log Table
  As an AIQ user
  I want to see the error log in my cluster
  So that I can see GCCompleted

#  Assumptions:
#    Given user is authenticated
#    Given user has access to cluster X

@test
  Scenario: Feeding data from ListClusterFaults to sf-table
    When I navigate to the "cluster/11/reporting/errorLog/" page
    Then I see a SolidFire table with "error-log" data
    And The "error-log" table contains columns: "ID, Date, Severity, Type, Node ID, Drive ID, Resolved, Resolution Time, Error Code, Details"
    And The "error-log" table contains "ListClusterFaults" data with attrs: "id, created, severity, nodeID, driveID, resolved, resolvedDate, code, details"
    And The "error-log" table contains "ListClusterFaults" data with attribute "resolvedDate" matching regex format "^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$"
