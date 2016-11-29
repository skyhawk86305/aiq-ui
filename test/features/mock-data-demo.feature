#Feature: Mock Backend
#  As a Developer
#  I want to test against a mock backend and be able to override that data within the tests themselves
#  So that I build better tests

#  Assumptions:
#    Given user is authenticated

#  Scenario: Fixture data served by default (CLOUD-2915)
#   When I navigate to the "cluster/11/volumes" page
#   Then I see default fixture data served by the mock server

#  @mockBackend
#  Scenario: Override http response within the test (CLOUD#2915)
#   Given I stub in mock data for the http call under test
#   When I navigate to the "cluster/11/volumes" page
#   Then I see my stubbed in data