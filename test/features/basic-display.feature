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
    When I click on the "main" navbar item "users"
    Then I am navigated to the route "/users"
    When I click on the "main" navbar item "dashboard"
    Then I am navigated to the route "/dashboard"
    When I click on the "sub" navbar item "dashboard-health"
    Then I am navigated to the route "/dashboard/health"

#  Scenario: API log functionality (CLOUD-2904)
#    Given The app is open in a browser
#    And I see the shared SolidFire navbar
#    When I click on the API log button
#    Then I see the shared SolidFire API log
