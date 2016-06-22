Running the Tests
============================

Unit tests are run and configured with Karma via Gulp.

Both e2e and acceptance test are run and configured with Protractor via Gulp.

## Unit Tests

`gulp test:unit`

They can be run in verbose mode with the [--v, --verbose] flag

`gulp test:unit --v`

## E2E & Acceptance Tests

These tests run against an actual SolidFire API (the code must first be deployed to the physical device under test).
The target endpoint can be configured via command line parameters (note: apiVersion requires a leading non-integer character):

`gulp test:e2e --ip 192.168.139.178 --port :442 --path node/develop --apiVersion _9.0 --authUsername admin --authPassword admin`

`gulp test:acceptance --ip 172.26.66.85 --port :442  --path node/develop --apiVersion _9.0 --authUsername admin --authPassword admin`

Alternatively they can be configured with a preset config object:

`gulp test:e2e --config hulk`

`gulp test:acceptance --config qe`

There are other alternative parameters for configuring how the tests run:

`--v, --verbose // Run tests in verbose mode (this may impact reporting)`

`--t, --tags    // For running features/scenarios with a specific tag (acceptance tests only)`

`--b, --browser // Change the browser that the tests run in [chrome, firefox, phantomjs, safari]`

`--l, --local   // To run the tests against a local instance of selenium (must first start server with: webdriver-manager start)`

Testing Guidelines
============================

Based directly off of https://github.com/CarmenPopoviciu/protractor-styleguide
And framework patterns taken from https://github.com/bassman5/MickAngularSeed

## Unit Testing

Unit tests are the first line of defense and ensure that the smallest parts of an application, the units, work as intended.
They are tested in complete isolation from the rest of the application, and are the most efficient form of testing.

  **Unit Tests Should:**
  
  * Always be preferred over e2e and acceptance tests
  * At a minimum have a test for each public function in the file
  * Attempt to cover edge cases for complex functions
  * Initially be written to fail, tests that always pass are not valuable
  * Compose describe blocks with documentation in mind
  * Be placed in a path that matches the location of the tested file within the app


## E2E Testing

E2E tests ensure that all units of an application interact as expected with each other and if the system as a whole
works as intended. They use selenium to interact with the browser and take much longer to run than unit tests.

  **E2E Tests Should:**
  
  * NOT test what has already been unit tested
  * Cover all edge cases not directly tested in the acceptance suite
  * Run independently at file level to allow them to be run in parallel
  * NOT have selectors (these belong in page objects)
  * Use a mock backend for testing functionality that is destructive to the product
  * Be placed in a path that matches the *general* location of the files being tested within the app

## Acceptance Testing

Acceptance tests are simply another flavor of e2e tests with a specific purpose. The intention of this test suite is to
ensure all business requirements for a specific feature request are met before being *accepted* by the product owner.
They are written in a Gherkin syntax (Given, When, Then), and are typically the most expensive set of tests.

  **Acceptance Tests Should:**
  
  * Be the the first e2e test written, and be passing before the task, ticket or feature request is accepted
  * Only test the minimum required functionality of the feature being developed
  * Be placed in a .feature file that is a 1:1 mapping to the task, ticket or feature request being developed
  * Have a matching step-definition file that contains only the steps that are unique to the feature
  * Always seek to use generic flexible step definitions from a shared location
  * Use before and after hooks for any feature setup and tear down


## Page Objects

Page Objects are a testing design pattern largely used for reducing code duplication. They provide an API to the page 
under test and are responsible of abstracting away its implementation details from the tests themselves.

  **Page Objects Should:**
  
  * NOT contain assertions
  * Contain all selectors for the page or component being described
  * Should contain functions for complex interactions only (NOT one liners like clicking or inputing values)
  * Have selectors that prefer protractor locators over css and css over text
  * Be UpperCamelCase to follow object-orientated class naming conventions
  

## Other Rules

  * Prefer to add meaningful classes / ids to code rather than building messy selectors
  * First look to use shared functions, step definitions or mocks before creating new ones
  * Do not change or remove existing classes or ids as they may be tied to styling


## Useful Links

  Karma - http://karma-runner.github.io/

  Karma design docs - https://github.com/karma-runner/karma/blob/master/thesis.pdf

  Protractor - http://angular.github.io/protractor

  GTAC 2010: The Future of Front-End Testing - https://www.youtube.com/watch?v=oX-0Mt5zju0

  Selenium - http://www.seleniumhq.org/docs/06_test_design_considerations.jsp#page-object-design-pattern

  Google Selenium pages - https://code.google.com/p/selenium/wiki/PageObjects

  Martin Fowler article on Page Objects - http://martinfowler.com/bliki/PageObject.html
