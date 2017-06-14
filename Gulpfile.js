'use strict';

var child,
  gulp = require('gulp'),
  yargs = require('yargs'),
  webpack = require('webpack'),
  karma = require('karma'),
  protractor = require('gulp-protractor'),
  childProcess = require('child_process'),
  tslint = require('gulp-tslint'),
  configs = {
    server: require('./server/server.config.js'),
    webpack: require('./webpack/webpack.prod'),
    karma: require('./karma.config.js'),
    protractor: './test/protractor.config.js'
  },
  argv = yargs
    .alias('v', 'verbose')
    .alias('b', 'browser')
    .alias('s', 'seleniumAddress')
    .alias('e', 'env')
    .alias('h', 'host')
    .alias('p', 'port')
    .alias('m', 'mock')
    .alias('w', 'watch')
    .alias('t', 'tag').argv,
  isE2ETask = process.argv[2] === 'test:e2e',
  isRemoteE2ETask = isE2ETask && argv.env;

gulp.task('build', function(done) {
  gulp.src('./client/404.html').pipe(gulp.dest('./build'));
  webpack(configs.webpack, done);
});

gulp.task('serve', function() {
  if (isE2ETask && !argv.mock) { process.argv.push('--mock'); }
  if (!isRemoteE2ETask) { child = childProcess.fork('./server/server.js', process.argv.slice(3)); }
});

gulp.task('test:unit', function (done) {
  if (argv.verbose) {
    configs.karma.remapCoverageReporter.text = null;
    configs.karma.reporters.push('spec');
  }
  if (argv.watch) {
    configs.karma.autoWatch = true;
    configs.karma.singleRun = false;
  }
  if (argv.browser) { configs.karma.browsers = [argv.browser]; }
  new karma.Server(configs.karma, function(c) { done(); process.exit(c); }).start();
});

gulp.task('test:e2e', ['webdriverUpdate', 'serve'], function () {
  return gulp.src(['test/e2e/**/*.spec.js'])
    .pipe(protractor.protractor({configFile: configs.protractor, args: getProtractorArgs()}))
    .on('error', function (e) { console.log(e); if (!isRemoteE2ETask) { child.kill(); } process.exit(-1); })
    .on('close', function() { if (!isRemoteE2ETask) { child.kill(); } process.exit(); });
});

gulp.task('lint:e2e', function() {
  return gulp.src(['test/e2e/**/*.spec.js'])
    .pipe(tslint({
      formatter: 'verbose',
      configuration: 'test/tslint.json',
    }))
    .pipe(tslint.report());
});

function getProtractorArgs() {
  var protractorArgs = [],
    fixture = typeof argv.mock === 'string' ? argv.mock : configs.server.local.fixture,
    env = argv.env || 'local',
    host = argv.host || configs.server[env].host,
    port = argv.port || configs.server[env].port;

  protractorArgs.push('--baseUrl', 'http://' + host + ':' + port + configs.server[env].subDir);
  protractorArgs.push('--env', env);
  protractorArgs.push('--fixture', fixture);
  if (argv.tag) { protractorArgs.push('--jasmineNodeOpts.grep', argv.tag); }
  if (argv.tableRows) { protractorArgs.push('--tableRows', argv.tableRows); }
  if (argv.browser) { protractorArgs.push('--capabilities.browserName', argv.browser); }
  if (argv.seleniumAddress) { protractorArgs.push('--seleniumAddress', 'http://'+argv.seleniumAddress+'/wd/hub'); }
  return protractorArgs;
}

gulp.task('webdriverUpdate', protractor.webdriver_update);
