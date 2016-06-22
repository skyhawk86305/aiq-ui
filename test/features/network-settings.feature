@getConfig @setConfig
Feature: Configuring Nodes via Network Settings
  As a user
  I want to be able to configure my nodes
  So that I can initialize them and modify them

#  Assumptions:
#    Given The user is authenticated
#    Given The app successfully loads on a SolidFire node at port :442

  Scenario: Bond 1G: Basic form display and saving config changes (EU-1637)
    When I navigate to the 'network-settings/bond-one-g' page
    Then I see the 'Bond1G' form
    And It is pre filled with my 'Bond1G' settings

    When I change the 'Bond1G' 'mtu' field to '1501'
    And I submit the 'Bond1G' form
    Then I see '1501' in the 'Bond1G' 'mtu' field without an error modal

  Scenario: Bond 10G: Basic form display and saving config changes (EU-1637)
    When I navigate to the 'network-settings/bond-ten-g' page
    Then I see the 'Bond10G' form
    And It is pre filled with my 'Bond10G' settings

    When I change the 'Bond10G' 'mtu' field to '1501'
    And I submit the 'Bond10G' form
    Then I see '1501' in the 'Bond10G' 'mtu' field without an error modal
