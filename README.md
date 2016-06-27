# aiq-ui

An Angular.js application for interacting with the AIQ backend

## Getting Started
 - Install node v4.x

 - Clone the repo
 
 ```
 git clone git@bitbucket.org:solidfire/aiq-ui.git
 ```
 
 - Install dependencies
 
 ```
 npm install
 ```
 
 ```
 bower install
 ```
 
 - Configure your local environment
    - Copy example.config.js and rename as local.config.js
    - Update the file with your AIQ credentials
    - Optional: Update the proxy by changing the apiServer field
 - Serve the app locally to see it in a browser
 
 ```
 gulp serve
 ```
 

      NOTE: Local express server is setup to handle basic auth and proxy requests. If session expires, it 
            will resend credentials on the next API call. Close the basic auth prompt and continue using the app.
 
## Development

TBD: commit messages, branching, curring releases, deploying, etc.

## Testing

See README in /text directory

## Gulp Commands

**gulp build** - Compiles markup files, scripts, and styles and places them into the build directory.

      NOTE: pass the flag --prod to minify and mangle

**gulp serve** - Builds the project, starts the express server (proxies request to configured instance of AIQ), and watches source file changes to trigger browser reload.

**gulp serve:mock** - Builds the project, starts the express server (responds to all API requests with /test/fixture data), and watches source file changes to trigger browser reload.

**gulp test:unit** - Runs unit tests via karma.

      NOTE: pass the flag -a, --analyze to run static analysis
      
      NOTE: pass the flag -v, --verbose to perform static code analysis

**gulp test:e2e** - Runs end-to-end tests via protractor.

**gulp test:acceptance** - Runs acceptance tests via protractor and cucumber.

      NOTE: pass the flag -a, --analyze to run static analysis
      
      NOTE: pass the flag -v, --verbose to perform static code analysis
      
      NOTE: pass the flag -t, --tags to run features/scenarios with a specific tag (acceptance tests only)
      
      NOTE: pass the flag -b, --browser to change the browser that the tests run in [chrome, firefox, safari]
      
      NOTE: pass the flag -l, --local to run the tests with a local instance of selenium against the app being served locally (vs. selenium grid / jenkins)


## License

Copyright (c) 2016 SolidFire, Inc.
