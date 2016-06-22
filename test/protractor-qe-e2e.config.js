exports.config = {

  framework: 'jasmine',

  // seleniumAddress: 'http://192.168.129.176:4444/wd/hub',
  baseUrl : "https://admin:admin@192.168.139.178:442/node/develop/index.htm#",
  capabilities: {
    'browserName': 'firefox'
  },
  specs : ["e2e/*.js","e2e/**/*.js"],

  params: {
    withMocks: false
  },

  onPrepare: function() {
    console.log(__dirname);
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    browser.driver.manage().window().maximize();
  },

  jasmineNodeOpts: {
    print: function() {}, // Override dots
    showColors: true
  }
};
