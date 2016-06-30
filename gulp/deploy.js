'use strict';

var gulp = require('gulp'),
    buildConfig = require('../build.config.js'),
    $ = require('gulp-load-plugins')({
      pattern: [
        'gulp-*'
      ]
    });

gulp.task('deploy:dev', function () {
  gulp.src(buildConfig.buildDir + '/**')
    .pipe($.rsync({
      root: 'build/',
      hostname: 'activeiq.dev.aiq.solidfire.net',
      destination: 'opt/solidfire/aiq-ui/current/',
      username: 'solidfire',
      progress: true
    }));
});
