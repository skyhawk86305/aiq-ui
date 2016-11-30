Feature: Cluster Performance Reporting Page
  As a User
  I want to navigate to a default cluster performance page
  So that I can view Cluster Performance information

#  Assumptions:
#    Given user is authenticated

  @clusterCapacity
  Scenario: Cluster Reporting Performance (CLOUD-3126)
    Given The app is open in a browser
    And I see the shared SolidFire navbar
    When I navigate to the "cluster/11/reporting/performance/" page
    Then I see a SolidFire sf-sync-graphs component with performance data
    And I see a Cluster IOPS graph
    And I see a Cluster Bandwidth graph
    And I see a Cluster Utilization graph
