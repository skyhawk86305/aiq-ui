# aiq-ui

An Angular.js application written in TypeScript for interacting with the AIQ backend

## Getting Started
 - Install NodeJS v6.9.x (Latest LTS release)

 - Install Gulp
 
`npm install -g gulp`

 - Clone the repo
 
`git clone git@bitbucket.org:solidfire/aiq-ui.git`
 
 - Install dependencies (You must be on NetApp VPN - to access sf-components on private npm registry)
 
`npm install`

 - Serve the app locally with mock data
 
`gulp serve --mock`

 - Check it out in a browser at http://localhost:3000 (Use ctrl+C to kill the server)

 - You may also configure the server to proxy requests to an actual end point. To do this:
    - Copy <project-root>/server/proxy.example.config.js into a new file called <project-root>/server/proxy.config.js
    - Update the file with your own AIQ credentials for the specific environment end point you want configured

`gulp serve`
 
## Development

 - Follow the steps above in 'Getting Started'

 - Make changes and watch Webpack automatically reload your browser
 
 - When finished ensure that everything works in the production build
 
`gulp build`

`gulp serve --prod`

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

`-m OR --mock // Change the fixture to something other than default`

`-s OR --seleniumAddress // Manually set the selenium address and port for running protractor tests`

`-h OR --host // Set the host name of the express server serving the UI`

`-p OR --port // Set the port number of the express server serving the UI`

`-t OR --tag   // Run a specific suite of tests tagged with some unique identifier. NOTE: does regex matching e.g. gulp test:e2e --tag ^.*(@smoke|@foo).*$`

`--tableRows   // Configure the number of table rows to test during e2e tests (default: 5)`


## License

Copyright (c) 2017 SolidFire, Inc.
