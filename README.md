# aiq-ui

An Angular.js application written in TypeScript for interacting with the AIQ backend


## Getting Started
 - Install NodeJS v6.11.x (Latest LTS release)
 
 - Install NPM v5.3.0
 
 `npm install npm@5.3.0 -g`

 - Install Gulp
 
`npm install -g gulp-cli`

 - Clone the repo
 
`git clone git@bitbucket.org:solidfire/aiq-ui.git` (requires your SSH key to be added to your BitBucket account)
 
 - Install dependencies (You must be on NetApp VPN - to access sf-components on private npm registry)
 
`npm install`

 - Serve the app locally with mock data, run `gulp serve --mock` and navigate your browser to 'http://localhost:3000'.

 - Check it out in a browser at http://localhost:3000 (Use ctrl+C to kill the server)

 - You may also configure the server to proxy requests to an actual end point. To do this:
    - Copy <project-root>/server/proxy.example.config.js into a new file called <project-root>/server/proxy.config.js
    - Update the file with your own AIQ credentials for the specific environment end point you want configured
      - Development environment: `http://activeiq.dev.aiq.solidfire.net`
      - Production environment: `https://activeiq.solidfire.com` (Only use if needed)
    - Run `gulp serve` to serve the app while using a real API backend to provide data.


## Development

### Setup

 - The repository contains an `.editorconfig` file, which specifies some formatting rules used in our files. Please
 ensure your IDE or text editor has the appropriate EditorConfig plugin installed, so that the rules are automatically
 followed when making code changes. This greatly reduces the number of comments related to formatting problems in pull
 requests.
 
 - Please review existing files in the repository to get a feel for the style used. We currently do not have a defined
 style guide.
 
 - When committing files, and creating a PR, please review the changed files. If you find modified files in which you
 didn't make code changes, or all of the changes seem to be related to spacing, review the files to make sure they
 are intended to be modified.
 
 - Add a pre-commit git hook for running the linter, so you don't accidentally check in code that fails linting. Create 
 the hook file, `.git/hooks/pre-commit`, in the local directory with the following contents:
 
 ```
 #!/bin/bash
 set -e
 
 node_modules/.bin/tslint client/**/*.ts
 node_modules/.bin/tslint --config test/tslint.json test/**/*.js
 ```
 
 - If the hook doesn't work (you can test by adding an `fdescribe` and trying to commit), you may have to
 add "execute" permissions on the file with `chmod +x .git/hooks/pre-commit`
 
### UI/UX Design

Before beginning work on a new card or feature, we usually have a design mockup created, if one is needed. All of the
design mockups can be found in 
[our Confluence space](https://solidfire.atlassian.net/wiki/spaces/ActiveIQ/pages/104646070/UX+Design).


### Local Development

 - Before starting development, make sure you are able to run all of the steps properly in the 'Getting Started' section
 of the README.

 - If you want to see your changes in real-time, run `gulp serve` and navigate your browser to 'http://localhost:3000'.
 As you make changes to (most) files in the repository, the UI will automatically reload the project's files.
 
 - To check how the project will build and look in production, run `gulp serve --prod`.
 
 - If you can't connect to to a real AIQ environment for API data, or want to test something specific in fixture data,
 run `gulp serve --mock` or `gulp serve -m`.


### Build Pipeline

This project utilizes Jenkins servers to build out a Continuous Integration / Continuous Deployment pipeline. There are
two main sets of Jenkins jobs for the pipeline: jobs that run on the `master` branch, and jobs that run for every
`feature` branch.

The URL for the Jenkins build server is: http://bdr-web-jenkins.den.solidfire.net/

On the Jenkins build server, there is a section/view titled 'Active IQ UI' which will display all of the build jobs
related to this repository.

#### Feature Pipeline

The feature pipeline is made up of 3 main jobs: **Build**, **Deploy**, and **E2E**. The **Build** job polls BitBucket
every ~2 minutes to see if any `feature/*` branches have new commits/changes. The job will build the project and run 
unit tests. If the project builds successfully and all of the unit tests pass, the **Deploy** and **E2E** jobs will
be triggered. 

The **Deploy** job is responsible to deploying the UI in the branch to our Development environment, so
that everyone can see the UI changes without being required to download and run the branch locally. There are two
URLs that can be used to view the branch's UI:

 - UI pulling data from the Dev environment: http://activeiq.dev.aiq.solidfire.net/<feature-branch-name>
 
 - UI pulling data from the Prod environment: http://activeiq-prod.dev.aiq.solidfire.net/<feature-branch-name>
 
The **E2E** job is responsible for running our suite of E2E tests using mock data and a Selenium Grid (soon to be
replaced by BrowserStack). Right now, the Selenium Grid only has working instances of the latest Chrome browser. If any
of the E2E tests fail, the job will fail. This job provides a last check to ensure we don't introduce regressions
into the application during new development.
 
**NOTE:** If the **Deploy** job is successful, but the UI for the branch was not deployed properly, talk to the team
lead of either the Full Stack AIQ or Backend AIQ teams. There are a couple of other Jenkins jobs on different machines
that are required for a deploy to work, due to networking issues. One of those jobs may have failed.

#### Master Pipeline

The master pipeline is made up of 4 main jobs: **Build**, **E2E**, **Deploy Dev**, and **Deploy Prod**. The **Build** 
job polls BitBucket every ~2 minutes to see if any changes have been committed to the `master` branch. The job will
build the project and run unit tests. If the project build successfully and all of the unit tests pass, the **E2E** job
will be triggered. 

The **E2E** job is responsible for running our suite of E2E tests using mock data and a Selenium
Grid (soon to be replaced by BrowserStack). Right now, the Selenium Grid only has working instances of the latest
Chrome browser. If any of the E2E tests fail, the job will fail. This job provides a last check to ensure we don't 
introduce regressions into the application during new development. 

If all of the tests pass, then the **Deploy Dev** and **Deploy Prod** jobs are triggered. The deploy jobs will deploy
the UI from the `master` branch to both the main dev environment site and to production. The URLs for these sites are:

 - Dev URL: http://activeiq.dev.aiq.solidfire.net
 
 - Prod URL: https://activeiq.solidfire.com/#/dashboard/overview
 
**NOTE:** If the **Deploy** job is successful, but the UI for the branch was not deployed properly, talk to the team
lead of either the Full Stack AIQ or Backend AIQ teams. There are a couple of other Jenkins jobs on different machines
that are required for a deploy to work, due to networking issues. One of those jobs may have failed.

### VCS System

 - The `master` branch is the source of truth for the project. Developers should never commit directly to the `master`
 branch, with very few exceptions. The only exceptions to the rule require the sign-off of everyone on the team, and
 should only happen for emergency bug fixes or build pipeline errors.
 
 - Instead of committing directly to the `master` branch, developers should create a branch for any new development.
 If the new development is related to a work item or card, the branch should be prefixed with `feature/`. For instance,
 `feature/CLOUD-1234` or `feature/some-new-thing`. If you want to try something new, or have a side project, prefix the
 branch with `test/`, e.g. `test/not-sure-this-will-work`. Branches can either be created remotely in BitBucket or 
 locally and later pushed to the BitBucket remote.
 
 - More commits (and smaller changes) are preferred to a small number of commits (and larger changes).
 
 - Push your commits often. At the very least, push any outstanding commits at the end of the day to the remote branch.
 Not only is this useful to backup your work in case something happens to your development machine, but it ensures
 someone can take over your work, in case of illness or other unforeseen circumstances.
 
 - We have a dedicated CI/CD build pipeline, please refer to the previous section about the build pipeline.
 
 - When you feel like your branch is complete and meets the acceptance criteria of the card, create a Pull Request in
 BitBucket from your branch to the `master` branch. New PRs should be populated with a default list of reviewers. If
 required, add other reviewers to the Pull Request. Also, add a description for what the PR is accomplishing.

## Testing

See <project-root>/test/README.md


## Gulp Commands

Compile markup files, scripts, and styles and place them into the build directory.

`gulp build`

Start the express server and enable webpack hot reloading of your browser.
NOTE: Uses proxy server by default which must first be configured (see instructions in getting started section above)

`gulp serve`

 - The server can be configured by passing arguments:

`-m OR --mock // Use a mock backend to serve fixture data. Accepts fixture name as parameter`

`-h OR --host // Set the host name of the express server serving the UI`

`-p OR --port // Set the port number of the express server serving the UI`

`--prod // Serve the minified and mangled code. Requires gulp build to be run first as it serves files from /build`

 - Examples:

`gulp serve --mock myFixture`

`gulp serve --host myHostName`

`gulp serve --port 3001`

`gulp serve --prod`

`gulp serve -m myFixture -h myHostName -p 3001 --prod`

Run unit tests via karma.
NOTE: Reports will be automatically generated and placed in /report

`gulp test:unit`

 - Text execution can be configured with:
 
`-b OR --browser // Change the browser that the tests run in [PhantomJS, chrome, firefox, safari]. Default: PhantomJS`

`-v OR --verbose // Run tests in verbose mode to output documentation`

Run end-to-end tests via protractor.

`gulp test:e2e`

 - Text execution can be configured with:

`-b OR --browser // Change the browser that the tests run in [chrome, firefox, safari]. Default: chrome`

`-s OR --seleniumAddress // Manually set the selenium address and port for running protractor tests`

`-e OR --env // Configure the tests to run against a different environemnt [local, dev, prod]. Default: local. Note: USERNAME and PASSWORD environment variables must be set for any env other than local.`

`-t OR --tag   // Run a specific suite of tests tagged with some unique identifier. NOTE: does regex matching e.g. gulp test:e2e --tag ^.*(@smoke|@foo).*$`

`--tableRows   // Configure the number of table rows to test during e2e tests (default: 5)`


## License

Copyright (c) 2017 SolidFire, Inc.
