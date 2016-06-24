Feature: Basic Display
  As a User
  I want a single page app (SPA) with a basic navigation bar
  So that I can quickly navigate between views

#  Assumptions:
#    Given user is authenticated

  Scenario: Default view (CLOUD-2904)
    Given The app is open in a browser
    Then I see the shared SolidFire navbar

  Scenario: Navbar functionality (CLOUD-2904)
    Given The app is open in a browser
    And I see the shared SolidFire navbar
    When I click on the "main" navbar item "Cluster"
    Then I am navigated to the route "/cluster"
    When I click on the "sub" navbar item "Drives"
    Then I am navigated to the route "/cluster/drives"

  Scenario: API log functionality (CLOUD-2904)
    Given The app is open in a browser
    And I see the shared SolidFire navbar
    When I click on the API log button
    Then I see the shared SolidFire API log

#  Scenario: Logout functionality (CLOUD-2891)
#    Given The app is open in a browser
#    And I see the shared SolidFire navbar
#    When I click on the logout menu option
