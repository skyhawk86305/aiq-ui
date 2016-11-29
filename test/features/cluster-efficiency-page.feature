Feature: Cluster Efficiency Reporting Page
  As a User
  I want to navigate to a default cluster efficiency page
  So that I can view Cluster Efficiency information

#  Assumptions:
#    Given user is authenticated

  @clusterEfficiency
  Scenario: Cluster Reporting Efficiency (CLOUD-3127)
    Given The app is open in a browser
    And I see the shared SolidFire navbar
    When I navigate to the "cluster/11/reporting/efficiency/" page
    Then I see a SolidFire sf-sync-graphs component with efficiency data
    And I see a Cluster Efficiency graph

