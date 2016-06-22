Feature: Basic Display
  As a user
  I want an application with the new look and feel when interacting with a node
  So that we can replace the legacy UI

#  Assumptions:
#    Given The user is authenticated
#    Given The app successfully loads on a SolidFire node at port :442

  Scenario: Default view with navbar (EU-1670)
    Given I navigate to the 'cluster-settings' page
    Then I see the shared SolidFire navbar

  Scenario: API log functionality (EU-1632)
    Given I navigate to the 'cluster-settings' page
    And I see the shared SolidFire navbar
    When I click on the API log button
    Then I see the shared SolidFire API log

  @nonAngular
  Scenario: Logout functionality (EU-1665)
    Given I navigate to the 'cluster-settings' page
    And I see the shared SolidFire navbar
    When I click on the logout menu option
    Then I am taken to the logout page
