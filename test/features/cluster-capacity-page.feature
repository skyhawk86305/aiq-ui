Feature: Cluster Capacity Reporting Page
  As a User
  I want to navigate to a default cluster capacity page
  So that I can view Cluster Capacity information

#  Assumptions:
#    Given user is authenticated

  @clusterCapacity
  Scenario: Cluster Reporting Capacity (CLOUD-3125)
    Given The app is open in a browser
    And I see the shared SolidFire navbar
    When I navigate to the "cluster/11/reporting/capacity/" page
    Then I see a SolidFire sf-sync-graphs component
    And I see a Cluster Provisioned Space graph
    And I see a Cluster Block Capacity graph
    And I see a Cluster Metadata Storage Space graph
