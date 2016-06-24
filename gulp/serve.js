'use strict';

var gulp = require('gulp'),
    path = require('path'),
    $ = require('gulp-load-plugins')({
        pattern: [
      'gulp-*',
      'del',
      'yargs',
      'browser-sync'
    ]
    }),
    buildConfig = require('../build.config.js'),
    localConfig = require('../local.config.js'),
    appFiles = path.join(buildConfig.appDir, '**/*'),
    mockLocalConfig = {host: localConfig.host, port: localConfig.port},
    //ToDo: configure to run mock server on jenkins
    mockJenkinsConfig = {host: 'JENKINS IP', port: 'JENKINS PORT'},
    argv = $.yargs.alias('l', 'local').argv;

// Start your local server and setup browserSync to reload your browser whenever src files change
gulp.task('serve', ['build'], function () {
  var browserSync = $.browserSync.create();

  $.nodemon({
    script: 'local.server.js',
    ignore: '*'
  });

  browserSync.init({
    proxy: 'http://' + localConfig.host + ':' + localConfig.port
  });

  gulp.watch([appFiles], ['build', browserSync.reload]);
});

// Replace the contents of mock.config.js with a config to run express locally or on jenkins
gulp.task('configure', function () {
  var mockConfig = argv.local ? mockLocalConfig : mockJenkinsConfig;
  return gulp.src('mock.config.js', { base: "./" })
    .pipe($.change(function(defaultConfig) {
      return defaultConfig.replace(/{([^}]*)}/, JSON.stringify(mockConfig));
    }))
    .pipe(gulp.dest('.'))
});

// Start the mock server, which is dynamically configured to run on jenkins or locally
gulp.task('serve:mock', ['build', 'configure'], function () {
  $.nodemon({
    script: 'mock.server.js',
    ignore: '*'
  });
});
