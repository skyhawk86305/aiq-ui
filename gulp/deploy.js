'use strict';

var gulp = require('gulp'),
    rsync = require('rsyncwrapper'),
    gutil = require('gulp-util'),
    $ = require('gulp-load-plugins')({
      pattern: [
        'gulp-*',
        'yargs'
      ]
    }),
    argv = $.yargs.alias('f', 'featureName').argv;

gulp.task('deploy:dev', function () {
  var deployDir = 'current';
  if (argv.featureName) {
    deployDir = 'feature/' + argv.featureName;
  }

  rsync({
    ssh: true,
    syncDest: true,
    recursive: true,
    src: 'build/',
    dest: 'solidfire@activeiq.dev.aiq.solidfire.net:/opt/solidfire/aiq-ui/' + deployDir,
    onStdout: log,
    onStderr: log,
    compareMode: 'checksum',
    args: ['--verbose']
  }, rsyncCallback);
});

function log(data) {
  var buffer = new Buffer(data);
  console.log(buffer.toString());
}

function rsyncCallback(error, stdout, stderr) {
  if (error) {
      gutil.log(error, stdout);
      console.log('\nRsync Failed: '+ error.message + '\n');
      process.exit(1);
  } else {
    console.log('\nRsync Successful\n')
  }
}
