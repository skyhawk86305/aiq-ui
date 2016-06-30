'use strict';

var gulp = require('gulp'),
    rsync = require('rsyncwrapper'),
    gutil = require('gulp-util'),
    $ = require('gulp-load-plugins')({
      pattern: [
        'gulp-*'
      ]
    });

gulp.task('deploy:dev', function () {
  rsync({
    ssh: true,
    syncDest: true,
    recursive: true,
    src: 'build/',
    dest: 'solidfire@activeiq.dev.aiq.solidfire.net:/opt/solidfire/aiq-ui/current',
    //privateKey: '/some/where',
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
  gutil.log(error, stdout);
  var message = error ? 'Failed:' + error.message : 'Successful';
  console.log('\nRsync '+message+'\n');
  process.exit(1);
}
