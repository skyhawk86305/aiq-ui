'use strict';

var gulp = require('gulp'),
  path = require('path'),
  browserSync = require('browser-sync'),
  nodemon = require('gulp-nodemon'),
  argv = require('yargs')
    .alias('h', 'host')
    .alias('p', 'port')
    .alias('j', 'jenkins').argv,
  serverConfig = require('../server/server.config.js'),
  buildConfig = require('../build.config.js'),
  appFiles = path.join(buildConfig.appDir, '**/*');

// Start the mock server
gulp.task('serve', ['build'], function(done) {
  var started = false;
  return nodemon({
    script: 'server/server.js',
    args: process.argv.slice(2),
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
  var browser = browserSync.create(),
    host = argv.host || serverConfig.defaultHost,
    port = argv.port || serverConfig.defaultPort;

  browser.init({
    proxy: 'http://' + host + ':' + port
  });

  gulp.watch([appFiles], ['build', browser.reload]);
});
