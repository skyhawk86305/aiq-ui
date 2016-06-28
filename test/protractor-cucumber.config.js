exports.config = {

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  allScriptsTimeout: 60000,

  directConnect: true,

  capabilities: {
    'browserName': 'firefox'
  },

  params: {
    withMocks: false
  },

  onPrepare: function() {
    browser.driver.manage().window().maximize();
  },

  cucumberOpts: {
    require: [
      'features/step_definitions/**/*.js',
      'features/support/**/*.js'
    ],
    format: "json",
    tags: "~@ignore"
  }
};
