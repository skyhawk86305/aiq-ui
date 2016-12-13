Running the Tests
============================

## Unit Tests

  - Are run and configured with Karma and executed via Gulp
  - Run in a headless browser (PhantomJS)
  - Output coverage reports to /report/coverage/PhantomJS/lcov-report/index.html
  - Fail if coverage for any of the categories drop below 75
  - Watermark thresholds are initially set at red: <80%, yellow: <90%, green: >90%
  - Coverage goals: TBD

`gulp test:unit`

 Text execution can be configured with:

`-a, --analyze // Run static analysis on code`

`-v, --verbose // Run tests in verbose mode to output documentation`

## E2E Tests

  - Are run and configured with Protractor via Gulp
  - Require you to first install and update selenium-standalone server
  - Run in an actual browser (configurable)
  - Run against the current build served locally via express
  - Use a mock backend to respond to API calls with text fixtures found at /server/fixtures/<fixture-name>
  - Output coverage reports TBD

`gulp test:e2e`

 Text execution can be configured with:

`-a, --analyze // Run static analysis on code`

`-b, --browser // Change the browser that the tests run in [chrome, firefox, safari]. Default: chrome`

`-m, --mock // Change the fixture to something other than default`

`-s, --seleniumAddress // Manually set the selenium address and port for running protractor tests`

`-h, --host // Set the host name of the express server serving the UI`

`-p, --port // Set the port number of the express server serving the UI`

`-tr, --tableRows   // Configure the number of table rows to test during e2e tests (default: 5)`

Testing Guidelines
============================

## Unit Testing

Unit tests are the first line of defense and ensure that the smallest parts of an application, the units, work as intended.
They are tested in complete isolation from the rest of the application, and are the most efficient form of testing. Unit
tests also track which lines (and what % of total) of source code are being executed. Reports are output 
to /report/coverage/PhantomJS.../lcov-report/index.html

  **Unit Tests Should:**
  
  * Always be preferred to e2e tests
  * At a minimum have a test for each public function in the file
  * Attempt to cover edge cases for complex functions
  * Initially be written to fail, tests that always pass are not valuable
  * Compose describe blocks with documentation in mind
  * Be placed in a path that matches the location of the tested file within the app


## E2E Testing

E2E tests ensure that all interactions with the UI work as intended. They use selenium to interact with the browser 
and take much longer to run than unit tests. These tests run against a mock backend and do NOT test real data. This mock
data (fixtures) is served via a local express server. These fixtures (which are returned by default) can also be overridden
within the tests themselves using angular-mocks. These tests are configured to take screenshots on failures and generate
reports that are output to /report/e2e/htmlReport.html

  **E2E Tests Should:**
  
  * NOT test what has already been unit tested
  * Run independently at file level to allow them to be run in parallel
  * NOT have selectors (these belong in page objects)


## Page Objects

Page Objects are a testing design pattern largely used for reducing code duplication. They provide an API to the page 
under test and are responsible of abstracting away its implementation details from the tests themselves. Page objects
can either be components of the app (navbar.po) or entire pages within the app (volumes-page.po).

  **Page Objects Should:**
  
  * NOT contain assertions or expectations
  * Contain all selectors for the page or component being described
  * Should contain functions for complex interactions only (NOT one liners like clicking or inputing values)
  * Have selectors that prefer protractor locators over css and css over text
  * Be UpperCamelCase to follow object-orientated class naming conventions
  

## Other Rules

  * Prefer to add meaningful classes / ids to code rather than building messy selectors
  * First look to use shared functions, step definitions or mocks before creating new ones
  * Do not change or remove existing classes or ids as they may be tied to styling

## Credit

Heavily influenced by both:

  * https://github.com/CarmenPopoviciu/protractor-styleguide
  * https://github.com/bassman5/MickAngularSeed

## Helpful Links

  Karma - http://karma-runner.github.io/

  Karma design docs - https://github.com/karma-runner/karma/blob/master/thesis.pdf

  Protractor - http://angular.github.io/protractor

  GTAC 2010: The Future of Front-End Testing - https://www.youtube.com/watch?v=oX-0Mt5zju0

  Selenium - http://www.seleniumhq.org/docs/06_test_design_considerations.jsp#page-object-design-pattern

  Google Selenium pages - https://code.google.com/p/selenium/wiki/PageObjects

  Martin Fowler article on Page Objects - http://martinfowler.com/bliki/PageObject.html
