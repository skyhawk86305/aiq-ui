'use strict';

var gulp = require('gulp'),
  path = require('path'),
  protractorConf = 'test/protractor.config.js',
  karmaConf = require('../test/karma.config.js'),
  $ = require('gulp-load-plugins')({
    pattern: [
      'del',
      'gulp-*',
      'karma',
      'run-sequence',
      'streamqueue',
      'wiredep',
      'yargs'
    ],
    rename: {
      'gulp-run': 'run',
      'gulp-rename': 'rename'
    }
  }),
  serverConfig = require('../server/server.config.js'),
  buildConfig = require('../build.config.js'),
  buildTemplateFiles = path.join(buildConfig.buildDir, '**/*.tpl.html'),
  buildJsFiles = path.join(buildConfig.buildJs, '**/*.js'),
  unitTests = path.join(buildConfig.buildTest, '**/*.spec.js'),
  e2eTests = path.join(buildConfig.e2eTestDir, '**/*.spec.js'),
  argv = $.yargs
    .alias('v', 'verbose')
    .alias('b', 'browser')
    .alias('s', 'seleniumAddress')
    .alias('h', 'host')
    .alias('p', 'port')
    .alias('m', 'mock')
    .alias('t', 'tableRows').argv;

karmaConf.files = [];

gulp.task('karmaFiles', ['build', 'tests'], function () {
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
    .pipe($.protractor.protractor({configFile: protractorConf, args: getProtractorArgs()}))
    .on('error', function (e) { console.log(e); process.exit(-1); })
    .on('close', function() { process.exit(); });
});

function getProtractorArgs() {
  var protractorArgs = [],
    fixture = typeof argv.mock === 'string' ? argv.mock : serverConfig.defaultFixture,
    host = argv.host || serverConfig.defaultHost,
    port = argv.port || serverConfig.defaultPort;

  protractorArgs.push('--baseUrl', 'http://' + host + ':' + port);
  protractorArgs.push('--fixture', fixture);
  if (argv.tableRows) { protractorArgs.push('--tableRows', argv.tableRows); }
  if (argv.browser) { protractorArgs.push('--capabilities.browserName', argv.browser); }
  if (argv.seleniumAddress) { protractorArgs.push('--seleniumAddress', 'http://'+argv.seleniumAddress+'/wd/hub'); }
  return protractorArgs;
}

gulp.task('webdriverUpdate', $.protractor.webdriver_update);

