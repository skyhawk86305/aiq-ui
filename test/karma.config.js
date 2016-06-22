'use strict';
var buildConfig = require('../build.config.js'),
    preprocessors = {};

preprocessors[buildConfig.buildJs + '**/*.js'] = ['coverage'];
preprocessors[buildConfig.buildDir + '**/*.tpl.html'] = ['ng-html2js'];

module.exports = {
  browsers: ['PhantomJS'],
  frameworks: ['jasmine'],
  reporters: ['failed', 'coverage'],
  preprocessors: preprocessors,
  coverageReporter: {
    type: 'lcov',
    dir: 'report/coverage/',
    check: {
      global: {
        statements: 75,
        branches: 75,
        functions: 75,
        lines: 75
      }
    },
    watermarks: {
      statements: [80, 90],
      branches: [80, 90],
      functions: [80, 90],
      lines: [80, 90]
    },
    // use with gulp unitTest --verbose to see all tests and detailed results. otherwise in coverage/test-details.txt
    reporters: [
      {type: 'lcov'},
      {type: 'text-summary'},
      {type: 'cobertura', subdir:'cobertura', file: 'cobertura.xml'}
    ]
  },
  ngHtml2JsPreprocessor: {
    stripPrefix: buildConfig.buildDir
  },
  singleRun: true
};
