'use strict';

var gulp = require('gulp'),
  path = require('path'),
  cucumberConf = 'test/protractor-cucumber.config.js',
  e2eConf = 'test/protractor-e2e.config.js',
  karmaConf = require('../test/karma.config.js'),
  $ = require('gulp-load-plugins')({
    pattern: [
      'del',
      'gulp-*',
      'karma',
      'run-sequence',
      'streamqueue',
      'wiredep',
      'yargs',
      'gulp-protractor-cucumber-html-cucumber-support',
      'gulp-protractor-cucumber-html-report'
    ],
    rename: {
      'gulp-protractor-cucumber-html-report': 'cucumberReports',
      'gulp-run': 'run',
      'gulp-rename': 'rename'
    }
  }),
  serverConfig = require('../server/server.config.js'),
  buildConfig = require('../build.config.js'),
  buildTemplateFiles = path.join(buildConfig.buildDir, '**/*.tpl.html'),
  buildJsFiles = path.join(buildConfig.buildJs, '**/*.js'),
  unitTests = path.join(buildConfig.unitTestDir, '**/*.spec.js'),
  e2eTests = path.join(buildConfig.e2eTestDir, '**/*.spec.js'),
  acceptanceTests = path.join(buildConfig.acceptanceTestDir, '**/*.feature'),
  argv = $.yargs
    .alias('v', 'verbose')
    .alias('t', 'tags')
    .alias('b', 'browser')
    .alias('s', 'seleniumAddress')
    .alias('h', 'host')
    .alias('p', 'port')
    .alias('j', 'jenkins').argv;

karmaConf.files = [];

gulp.task('karmaFiles', ['build'], function () {
  var stream = $.streamqueue({objectMode: true});
  stream.queue(gulp.src($.wiredep({devDependencies: true}).js));
  stream.queue(gulp.src([buildTemplateFiles]));
  stream.queue(gulp.src([buildJsFiles])
    .pipe($.angularFilesort()));
  stream.queue(gulp.src([unitTests]));
  return stream.done()
    .on('data', function (file) {
      karmaConf.files.push(file.path);
    });
});

gulp.task('test:unit', ['lint', 'karmaFiles'], function (done) {
  if (argv.verbose) {
    karmaConf.coverageReporter.reporters.push({type: 'text'});
    karmaConf.reporters.push('spec');
  } else {
    karmaConf.coverageReporter.reporters.push({type: 'text', subdir: '.', file: 'test-details.txt'});
  }
  var karmaServer = new $.karma.Server(karmaConf, function(exitCode) {
    if (exitCode === 1) {
      console.log('Karma unit test coverage',karmaConf.coverageReporter.check);
      done();
      process.exit();
    } else {
      console.log('Karma has exited with ' + exitCode);
      done();
      process.exit();
    }
  });
  karmaServer.start();
});

gulp.task('test:e2e', ['webdriverUpdate', 'serve'], function () {
  return gulp.src([e2eTests])
    .pipe($.protractor.protractor({configFile: e2eConf, args: getProtractorArgs()}))
    .on('error', function (e) { console.log(e); process.exit(-1); })
    .on('close', function() { process.exit(); });
});

gulp.task('test:acceptance', ['webdriverUpdate', 'serve'], function () {
  return gulp.src([acceptanceTests])
    .pipe($.protractor.protractor({configFile: cucumberConf, args: getProtractorArgs()}))
    .on('error', function (e) { console.log(e); process.exit(-1); })
    .on('close', function() { process.exit(); });
});

function getProtractorArgs() {
  var protractorArgs = [],
    seleniumAddress = argv.jenkins ? serverConfig.seleniumGrid : argv.seleniumAddress,
    host = argv.jenkins ? serverConfig.jenkinsHost : argv.host || serverConfig.defaultHost,
    port = argv.jenkins ? serverConfig.jenkinsPort : argv.port || serverConfig.defaultPort;

  protractorArgs.push('--baseUrl', 'http://' + host + ':' + port);
  if (argv.browser) { protractorArgs.push('--capabilities.browserName', argv.browser); }
  if (argv.tags) { protractorArgs.push('--cucumberOpts.tags', argv.tags); }
  if (argv.verbose) { protractorArgs.push('--cucumberOpts.format', 'pretty'); }
  if (seleniumAddress) { protractorArgs.push('--seleniumAddress', 'http://'+argv.seleniumAddress+'/wd/hub'); }
  return protractorArgs;
}

gulp.task('generateReport', [], function () {
  var cucumberJSONoutputPath = './report/cucumber/cucumber-test-results.json',
    prettyReportPath = './report/cucumber/output';
  return gulp.src(cucumberJSONoutputPath)
    .pipe($.cucumberReports({dest: prettyReportPath }))
    .pipe($.run('./node_modules/.bin/cucumber-junit', {verbosity: 0}))
    .pipe($.rename('acceptance.xml'))
    .pipe(gulp.dest('./report/junit'));
});

gulp.task('webdriverUpdate', $.protractor.webdriver_update);

