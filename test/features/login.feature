Feature: Authentication
  As a User
  I want to be able to log in and log out through the UI
  So that people won't get into my account

#  Assumptions:
#    Given user is not authenticated
  @authentication @login
  Scenario: Logging in with a valid login (CLOUD-2891)
    Given I am a user with a valid login
    When I navigate to the "/" page
    And I attempt to login
    Then I am successfully logged in

  @authentication @login
  Scenario: Logging in with an invalid username (CLOUD-2891)
    Given I am a user with an invalid username
    When I navigate to the "/" page
    And I attempt to login
    Then I see I am unsuccessfully logged in

  @authentication @login
  Scenario: Logging in with an invalid password (CLOUD-2891)
    Given I am a user with an incorrect password
    When I navigate to the "/" page
    And I attempt to login
    Then I see I am unsuccessfully logged in

#  Assumptions:
#    Given user is authenticated
  @authentication @logout
  Scenario: Logging out ()
    When I navigate to the "/" page
    And I attempt to logout
    Then I am successfully logged out



