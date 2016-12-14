# aiq-ui

An Angular.js application written in TypeScript for interacting with the AIQ backend

## Getting Started
 - Install NodeJS v6.9.x (Latest LTS release)

 - Clone the repo
 
`git clone git@bitbucket.org:solidfire/aiq-ui.git`
 
 - Install dependencies
 
`npm install`
 
`bower install`

`tsd install`

 - Serve the app locally with mock data
 
`gulp serve --mock`

 - Check it out in a browser at http://localhost:3000 (Use ctrl+C to kill the server)

 - You may also configure the server to proxy requests to an actual end point. To do this:
    - Copy <project-root>/server/proxy.example.config.js into a new file called <project-root>/server/proxy.config.js
    - Update the file with your own AIQ credentials for the specific environment end point you want configured

`gulp serve`
 
## Development

 - Follow the steps above in 'Getting Started'

 - Enable browser reload on changes to app files using:

`gulp watch`

## Testing

See <project-root>/test/README.md

## Gulp Commands

Compile markup files, scripts, and styles and place them into the build directory.

`gulp build`

 - Text execution can be configured with:

`--prod // Minify and mangle source code for production`

Build the project and start the express server (proxy server by default).

`gulp serve`

 - Text execution can be configured with:

`-m, --mock // Replace the proxy end point with a mock backend that serves fixture data. Accepts fixture name as parameter`

`-h, --host // Set the host name of the express server serving the UI`

`-p, --port // Set the port number of the express server serving the UI`

Serve the application locally, watch source files for changes and reload the browser on changes.

`gulp watch`

 - Text execution can be configured with the same arguments for the serve task above.

Run unit tests via karma.

`gulp test:unit`

 Text execution can be configured with:

`-a, --analyze // Run static analysis on code`

`-v, --verbose // Run tests in verbose mode to output documentation`

Run end-to-end tests via protractor.

`gulp test:e2e`

 Text execution can be configured with:

`-a, --analyze // Run static analysis on code`

`-b, --browser // Change the browser that the tests run in [chrome, firefox, safari]. Default: chrome`

`-m, --mock // Change the fixture to something other than default`

`-s, --seleniumAddress // Manually set the selenium address and port for running protractor tests`

`-h, --host // Set the host name of the express server serving the UI`

`-p, --port // Set the port number of the express server serving the UI`

`-t, --tableRows   // Configure the number of table rows to test during e2e tests (default: 5)`


## License

Copyright (c) 2016 SolidFire, Inc.
