exports.config = {

  framework: 'jasmine',

  allScriptsTimeout: 60000,

  directConnect: true,

  capabilities: {
    'browserName': 'firefox'
  },

  params: {
    withMocks: false
  },

  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    browser.driver.manage().window().maximize();
  },

  jasmineNodeOpts: {
    print: function() {}, // Override dots
    showColors: true
  }
};
