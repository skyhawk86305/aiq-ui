'use strict';

var gulp = require('gulp'),
  path = require('path'),
  $ = require('gulp-load-plugins')({
    pattern: [
      'gulp-*',
      'browser-sync',
      'yargs'
    ]
  }),
  serverConfig = require('../server/server.config.js'),
  buildConfig = require('../build.config.js'),
  appFiles = path.join(buildConfig.appDir, '**/*'),
  argv = $.yargs
    .alias('h', 'host')
    .alias('p', 'port')
    .alias('j', 'jenkins').argv;

// Start the mock server
gulp.task('serve', ['build:dev'], function(done) {
  var started = false;
  return $.nodemon({
    script: 'server/server.js',
    args: process.argv.slice(3),
    ignore: '*'
  }).on('start', function() {
    if (!started) {
      started = true;
      done();
    }
  });
});

// Watch for changes and reload browser
gulp.task('watch', ['serve'], function () {
  var browserSync = $.browserSync.create(),
    host = argv.jenkins ? serverConfig.jenkinsHost : argv.host || serverConfig.defaultHost,
    port = argv.jenkins ? serverConfig.jenkinsPort : argv.port || serverConfig.defaultPort;

  browserSync.init({
    proxy: 'http://' + host + ':' + port
  });

  gulp.watch([appFiles], ['build', browserSync.reload]);
});
