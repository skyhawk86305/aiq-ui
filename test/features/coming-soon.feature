Feature: Coming Soon
  As a user
  I want to see a "Coming Soon" indicator when I land on a page that does
  not yet exist.

#  Assumptions:
#    Given user is authenticated
  @comingsoon
  Scenario: Coming Soon Indicator (CLOUD-3169)
    Given The app is open in a browser
    When I navigate to the "dashboard/overview/sub3/" page
    Then I see a "Page Coming Soon" message
    And I see a "click here" link
