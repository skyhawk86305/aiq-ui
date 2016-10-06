exports.config = {

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  seleniumAddress:"http://127.0.0.1:4444/wd/hub",

  baseUrl:"http://localhost:3001",

  capabilities: {
    'browserName': 'chrome'
  },

  params: {
    withMocks: false,
    authUsername: 'admin',
    authPassword: 'admin',
    ip: '192.168.139.178',
    port: ':442',
    apiVersion: '#9.0',
    path: 'node/develop'
  },

  onPrepare: function() {
    browser.driver.manage().window().setSize(1680, 1050);
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
