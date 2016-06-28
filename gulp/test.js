'use strict';
var gulp = require('gulp')
  , path = require('path')
  , cucumberConf = 'test/protractor-cucumber.config.js'
  , e2eConf = 'test/protractor-e2e.config.js'
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
  , argv = $.yargs.alias('v', 'verbose').alias('t', 'tags').alias('b', 'browser').alias('l', 'local').argv
  , localConfig = argv.local ? require('../local.config.js') : {}
  , jenkinsConfig = {host: '192.168.138.155', port: '3000'}
  , mockConfig = argv.local ? localConfig : jenkinsConfig;

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

// Creates a gitignored mock.config.js with settings to run express either locally or on jenkins
gulp.task('configure:mock', function () {
  return gulp.src('example.config.js')
    .pipe($.change(function(defaultConfig) {
      return defaultConfig.replace(/{([^}]*)}/, JSON.stringify(mockConfig));
    }))
    .pipe($.concat('mock.config.js'))
    .pipe(gulp.dest('.'))
});

gulp.task('test:e2e', ['configure:mock', 'serve:mock'], function () {
  return gulp.src([e2eTests])
    .pipe($.protractor.protractor({configFile: e2eConf, args: getProtractorArgs()}))
    .on('error', function (e) { console.log(e); process.exit(-1); })
    .on('close', function(e) { process.exit(); });
});

gulp.task('test:acceptance', ['configure:mock', 'serve:mock'], function () {
  return gulp.src([acceptanceTests])
    .pipe($.protractor.protractor({configFile: cucumberConf, args: getProtractorArgs()}))
    .on('error', function (e) { console.log(e); process.exit(-1); })
    .on('close', function(e) { process.exit(); });
});

function getProtractorArgs() {
  var protractorArgs = [];
  protractorArgs.push('--baseUrl', 'http://' + mockConfig.host + ':' + mockConfig.port);
  if(argv.browser) { protractorArgs.push('--capabilities.browserName', argv.browser); }
  if(argv.tags) { protractorArgs.push('--cucumberOpts.tags', argv.tags); }
  if(argv.verbose) {
    protractorArgs.push('--cucumberOpts.format', 'pretty');
    //ToDo: update the protractor-e2e config
  }
  if (!argv.local) {
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

