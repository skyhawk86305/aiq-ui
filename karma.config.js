'use strict';

module.exports = {
  singleRun: true,
  browsers: ['PhantomJS'],
  frameworks: ['jasmine', 'source-map-support'],
  reporters: ['coverage', 'junit', 'remap-coverage'],

  files: [
    'client/vendor.ts',
    'client/app/app.module.ts',
    'node_modules/angular-mocks/angular-mocks.js',
    'client/test.ts'
  ],

  preprocessors: {
    'client/vendor.ts': ['webpack'],
    'client/app/app.module.ts': ['webpack'],
    'client/test.ts': ['webpack']
  },

  webpack: require('./webpack/webpack.test'),

  webpackMiddleware: {
    noInfo: true
  },

  coverageReporter: {
    type: 'in-memory',
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
    }
  },

  remapCoverageReporter: {
    'text-summary': null,
    html: './report/html',
    text: './report/text/test-details.txt',
    cobertura: './report/cobertura/cobertura.xml'
  },

  junitReporter: {
    outputDir: 'report/junit',
    useBrowserName: true
  }
};
