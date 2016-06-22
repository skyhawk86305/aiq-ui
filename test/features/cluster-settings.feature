@getConfig @setConfig
Feature: Configuring Nodes via Cluster Settings
  As a user
  I want to be able to configure my cluster settings on a node
  so that I can prepare it to join a cluster

#  Assumptions:
#    Given The user is authenticated
#    Given The app successfully loads on a SolidFire node at port :442
#    Given The cluster is not in active state

  Scenario: Basic form display and saving config changes (EU-1637)
    When I navigate to the 'cluster-settings' page
    Then I see the Cluster Settings form
    And It is pre filled with my cluster settings

    When I change the 'clusterName' field to 'foobar'
    And I submit the Cluster Settings form
    Then I see 'foobar' in the 'clusterName' field without an error modal
