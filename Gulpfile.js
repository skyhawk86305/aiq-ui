'use strict';

var gulp = require('gulp'),
  yargs = require('yargs'),
  webpack = require('webpack'),
  karma = require('karma'),
  protractor = require('gulp-protractor'),
  childProcess = require('child_process'),
  configs = {
    server: require('./server/server.config.js'),
    webpack: require('./webpack/webpack.prod'),
    karma: require('./test/karma.config.js'),
    protractor: './test/protractor.config.js'
  },
  argv = yargs
    .alias('v', 'verbose')
    .alias('b', 'browser')
    .alias('s', 'seleniumAddress')
    .alias('h', 'host')
    .alias('p', 'port')
    .alias('m', 'mock')
    .alias('t', 'tableRows').argv;

gulp.task('build', function(done) {
  webpack(configs.webpack, done);
});

gulp.task('serve', function() {
  if (process.argv[2] === 'test:e2e' && !argv.mock) { process.argv.push('--mock'); }
  childProcess.fork('./server/server.js', process.argv.slice(3));
});

gulp.task('test:unit', function (done) {
  if (argv.verbose) {
    configs.karma.remapCoverageReporter.text = null;
    configs.karma.reporters.push('spec');
  }
  if (argv.browser) { configs.karma.browsers = [argv.browser]; }
  new karma.Server(configs.karma, function() { done(); process.exit(); }).start();
});

gulp.task('test:e2e', ['webdriverUpdate', 'serve'], function () {
  return gulp.src(['test/e2e/**/*.spec.js'])
    .pipe(protractor.protractor({configFile: configs.protractor, args: getProtractorArgs()}))
    .on('error', function (e) { console.log(e); process.exit(-1); })
    .on('close', function() { process.exit(); });
});

function getProtractorArgs() {
  var protractorArgs = [],
    fixture = typeof argv.mock === 'string' ? argv.mock : configs.server.defaultFixture,
    host = argv.host || configs.server.defaultHost,
    port = argv.port || configs.server.defaultPort;

  protractorArgs.push('--baseUrl', 'http://' + host + ':' + port);
  protractorArgs.push('--fixture', fixture);
  if (argv.tableRows) { protractorArgs.push('--tableRows', argv.tableRows); }
  if (argv.browser) { protractorArgs.push('--capabilities.browserName', argv.browser); }
  if (argv.seleniumAddress) { protractorArgs.push('--seleniumAddress', 'http://'+argv.seleniumAddress+'/wd/hub'); }
  return protractorArgs;
}

gulp.task('webdriverUpdate', protractor.webdriver_update);
