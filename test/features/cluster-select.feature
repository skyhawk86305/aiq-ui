Feature: Cluster Select
  As a User
  I want to able to select any of my visible clusters from any screen
  So that can switch from cluster to cluster easily

#  Assumptions:
#    Given user is authenticated

  Scenario: Changing cluster selection (CLOUD-2896)
    Given The app is open in a browser
    And The cluster select drop down is visible
    Then The selected cluster is "All Clusters"
    When I select cluster "barCluster"
    Then The selected cluster is "barCluster"
    When I select cluster "fooCluster"
    Then The selected cluster is "fooCluster"
