Feature: Event Table
  As an AIQ user
  I want to see events from my cluster
  So that I can see GCCompleted

#  Assumptions:
#    Given user is authenticated
#    Given user has access to cluster X

  @events
  Scenario: Feeding data from ListEvents to sf-table (CLOUD-2897)
    When I navigate to the "cluster/11/reporting/events/" page
    Then I see a SolidFire table with "event" data
    And The "event" table contains columns: "ID, Event Time, Type, Message, Service ID, Node ID, Drive ID, Details"
    And The "event" table contains "ListEvents" data with attrs: "eventID, timeOfReport, eventInfoType, message, serviceID, nodeID, driveID, detailsString"
    And The "event" table contains "ListEvents" data with attribute "timeOfReport" matching regex format "^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$"

