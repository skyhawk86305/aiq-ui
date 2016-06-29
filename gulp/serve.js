'use strict';

var gulp = require('gulp'),
    path = require('path'),
    $ = require('gulp-load-plugins')({
        pattern: [
      'gulp-*',
      'browser-sync'
    ]
    }),
    buildConfig = require('../build.config.js'),
    appFiles = path.join(buildConfig.appDir, '**/*')

// Start your local server and setup browserSync to reload your browser whenever src files change
gulp.task('serve', ['build'], function () {
  var browserSync = $.browserSync.create(),
      localConfig = require('../local.config.js');

  $.nodemon({
    script: 'local.server.js',
    ignore: '*'
  });

  browserSync.init({
    proxy: 'http://' + localConfig.host + ':' + localConfig.port
  });

  gulp.watch([appFiles], ['build', browserSync.reload]);
});

// Start the mock server, which is dynamically configured to run on jenkins or locally
gulp.task('serve:mock', ['build:dev'], function () {
  $.nodemon({
    script: 'mock.server.js',
    ignore: '*'
  });
});
