'use strict';
var gulp = require('gulp')
  , path = require('path')
  , karmaConf = require('../test/karma.config.js')
  , $ = require('gulp-load-plugins')({
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
    'gulp-protractor-cucumber-html-report': 'cucumberReports'
  }
  }
)
  , buildConfig = require('../build.config.js')
  , buildTemplateFiles = path.join(buildConfig.buildDir, '**/*.tpl.html')
  , buildJsFiles = path.join(buildConfig.buildJs, '**/*.js')
  , unitTests = path.join(buildConfig.unitTestDir, '**/*.spec.js')
  , e2eTests = path.join(buildConfig.e2eTestDir, '**/*.spec.js')
  , acceptanceTests = path.join(buildConfig.acceptanceTestDir, '**/*.feature')
  , argv = $.yargs.alias('v', 'verbose').argv;

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
      console.log('Karma unit test coverage is low',karmaConf.coverageReporter.check);
      done('unit test coverage standards not met https://en.wikipedia.org/wiki/Code_coverage#Coverage_criteria');
    } else {
      console.log('Karma has exited with ' + exitCode);
      done();
    }
  });
  karmaServer.start();
});

gulp.task('test:e2e', [], function () {
  var configFile = 'test/protractor-e2e.config.js';
  var args = getProtractorArgs();
  return gulp.src([e2eTests])
    .pipe($.protractor.protractor({configFile: configFile, args: args}))
    .on('error', function (e) { console.log(e); });
});

gulp.task('test:acceptance', [], function () {
  var configFile = 'test/protractor-cucumber.config.js';
  var args = getProtractorArgs();
  return gulp.src([acceptanceTests])
    .pipe($.protractor.protractor({configFile: configFile, args: args}))
    .on('error', function (e) { console.log(e); });
});

function getProtractorArgs() {
  var protractorArgs = [];
  var authUsername, authPassword, ip, port, path, apiVersion;
  if(argv.config) {
    switch(argv.config) {
      case('qe'):
        authUsername = 'admin';
        authPassword = 'admin';
        ip = '192.168.133.120';
        port = ':442';
        path = 'node/develop';
        apiVersion = '9.0';
        break;
      case('hulk'):
        authUsername = 'admin';
        authPassword = 'admin';
        ip = '172.26.66.85';
        port = ':442';
        path = 'node/develop';
        apiVersion = '9.0';
        break;
      default:
        throw 'invalid config param';
    }
  } else {
    argv = $.yargs
      .alias('v', 'verbose')
      .alias('u', 'authUsername')
      .alias('p', 'authPassword')
      .alias('a', 'apiVersion')
      .alias('t', 'tags')
      .alias('b', 'browser')
      .alias('l', 'local')
      .demand(['authUsername', 'authPassword', 'ip', 'port', 'path', 'apiVersion'])
      .argv;
    authUsername = argv.authUsername;
    authPassword = argv.authPassword;
    ip = argv.ip;
    port = argv.port;
    path = argv.path;
    apiVersion = argv.apiVersion.slice(1);
  }
  protractorArgs.push('--baseUrl', 'https://'+authUsername+':'+authPassword+'@'+ip+port+'/'+path+'/index.htm');
  protractorArgs.push('--params.authUsername', authUsername);
  protractorArgs.push('--params.authPassword', authPassword);
  protractorArgs.push('--params.ip', ip);
  protractorArgs.push('--params.port', port);
  protractorArgs.push('--params.apiVersion', '#'+apiVersion);
  if(argv.tags) { protractorArgs.push('--cucumberOpts.tags', argv.tags); }
  if(argv.verbose) { protractorArgs.push('--cucumberOpts.format', 'pretty'); }
  if(argv.browser) { protractorArgs.push('--capabilities.browserName', argv.browser); }
  if (argv.local) {
   // protractorArgs.push('--seleniumServerJar', true);
  } else {
    protractorArgs.push('--seleniumAddress', 'http://192.168.129.176:4444/wd/hub');
  }

  return protractorArgs
}

gulp.task('generateReport', [], function () {
var cucumberJSONoutputPath = './report/cucumber/cucumber-test-results.json',
  prettyReportPath = './report/cucumber/output';
  return gulp.src(cucumberJSONoutputPath)
    .pipe($.cucumberReports({dest: prettyReportPath }));
});

gulp.task('webdriverUpdate', $.protractor.webdriver_update);

