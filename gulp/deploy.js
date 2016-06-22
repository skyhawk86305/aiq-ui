
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
// jshint camelcase:false
/* globals rsync, gutil, git, gulp, prompt, run, console, onStdout, onStderr */

'use strict';
/* jshint ignore:start */
var gulp = require('gulp')
  , rsync = require('rsyncwrapper')
  , run = require('run-sequence')
  , prompt = require('gulp-prompt').prompt
  , git = require('gulp-git')
  , gutil = require('gulp-util')
  , $ = require('gulp-load-plugins')({
    pattern: [
      'gulp-*'
    ]
  });

/* jshint ignore:end */

/* Helper Methods */
var get_cluster_ip = function (cluster_name) {
  switch (cluster_name) {
    case 'Geoff':
      return '192.168.139.178';
    case 'AT2':
      return '172.26.82.1';
    case 'Hulk':
      return '172.27.1.57';
    case 'Lancia':
      return '172.27.1.44';
    case 'Fluorine':
      return '192.168.139.177';
    case 'VVOLSDev':
      return '192.168.139.168';
    case 'VVOLSProd':
      return '172.30.64.21';
    case 'VVOLSSaroch':
      return '172.30.64.123';
    case 'FCAaron':
      return '192.168.139.118';
    default:
      throw 'Invalid cluster name';
  }
};

var perform_rsync_no_key = function (cluster_ip, sub_directory, dry_run, version) {
  var path,
    build_directory = './build/';
  if (cluster_ip === '172.27.1.44') {
    version = '8.0';
  }else if (!version){
    version = '9.0';
  }

  path =  'root@' + cluster_ip + ':/sf/etc/webmgmt/' + version + sub_directory;
  console.log('cluster ip ',cluster_ip, ' deploy attempt for element version ',version,' to ', path);
  rsync({
    src: build_directory,
    dest: path,
    ssh: true,
    recursive: true,
    syncDest: true,
    //privateKey: '/root/.ssh/solidfire_dev_rsa',
    onStdout: function (data) {
      var buffer = new Buffer(data);
      console.log(buffer.toString());
    },
    onStderr: function (data) {
      var buffer = new Buffer(data);
      console.log(buffer.toString());
    },
    compareMode: 'checksum',
    dryRun: dry_run,
    args: ['--verbose']
  }, function (error, stdout) {
    gutil.log(error, stdout);
    if (!error) {
      console.log('\nRsync Successful\n');
    } else {
      process.exit(1);
    }
    if (dry_run) { console.log('This was only a dry run. Your files were NOT copied to the cluster.'); }
  });
};
var jenkins_perform_rsync_with_dev_rsa_key = function (cluster_ip, sub_directory, dry_run, version) {
  console.log('cluster ip ',cluster_ip, ' version ',version,' to ', sub_directory);
  var path,
    build_directory = './build/';
  if (cluster_ip === '172.27.1.59') {
    version = '8.4';
  } else if (!version) {
    version = '9.0';
  }
  path =  'root@' + cluster_ip + ':/sf/etc/webmgmt/' + version + sub_directory;
  console.log('cluster ip ',cluster_ip, ' deploy attempt for element version ',version,' to ', path);
  rsync({
    src: build_directory,
    dest: path,
    ssh: true,
    recursive: true,
    syncDest: true,
    privateKey: '/root/.ssh/solidfire_dev_rsa',
    onStdout: function (data) {
      var buffer = new Buffer(data);
      console.log(buffer.toString());
    },
    onStderr: function (data) {
      var buffer = new Buffer(data);
      console.log(buffer.toString());
    },
    compareMode: 'checksum',
    dryRun: dry_run,
    args: ['--verbose']
  }, function (error, stdout) {
    gutil.log(error, stdout);
    if (!error) {
      console.log('\nRsync Successful\n');
    } else {
      process.exit(1);
    }
    if (dry_run) { console.log('This was only a dry run. Your files were NOT copied to the cluster.'); }
  });
};

/* gulp deploy tasks */
/* Default AT2 Cluster Deploy Tasks  */

gulp.task('deploy-build-to-at2-develop', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('AT2');
  subDirectory = '/node/develop';
  performDryRun = false;
  jenkins_perform_rsync_with_dev_rsa_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-at2-test', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('AT2');
  subDirectory = '/node/test';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-at2-prod-build', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('AT2');
  subDirectory = '/node/develop-prod';
  performDryRun = false;
  jenkins_perform_rsync_with_dev_rsa_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-at2-charlie', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('AT2');
  subDirectory = '/node/charlie';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-at2-nathan', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('AT2');
  subDirectory = '/node/nathan';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-at2-vania', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('AT2');
  subDirectory = '/node/vania';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-at2-ryan', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('AT2');
  subDirectory = '/node/ryan';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});

/* QE Cluster Deploy Tasks */

gulp.task('deploy-build-to-QE-nathan', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('Geoff');
  subDirectory = '/node/nathan';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-QE-vania', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('Geoff');
  subDirectory = '/node/vania';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-QE-charlie', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('Geoff');
  subDirectory = '/node/charlie';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-geoff-develop-from-local', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('Geoff');
  subDirectory = '/node/develop';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-geoff-develop', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('Geoff');
  subDirectory = '/node/develop';
  performDryRun = false;
  jenkins_perform_rsync_with_dev_rsa_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-geoff-geoff', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('Geoff');
  subDirectory = '/node/geoff';
  performDryRun = false;
  jenkins_perform_rsync_with_dev_rsa_key(clusterIP, subDirectory, performDryRun);
});

/* Hulk Deploy Tasks */

gulp.task('deploy-build-to-hulk-develop', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('Hulk');
  subDirectory = '/node/develop';
  performDryRun = false;
  jenkins_perform_rsync_with_dev_rsa_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-lancia-develop', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('Lancia');
  subDirectory = '/node/develop';
  performDryRun = false;
  jenkins_perform_rsync_with_dev_rsa_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-hulk-charlie', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('Hulk');
  subDirectory = '/node/charlie';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-hulk-ryan', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('Hulk');
  subDirectory = '/node/ryan';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-hulk-nathan', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('Hulk');
  subDirectory = '/admin/nathan';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-hulk-vania', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('Hulk');
  subDirectory = '/node/vania';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-release-build-to-hulk-release', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('Hulk');
  subDirectory = '/node/release';
  performDryRun = false;
  jenkins_perform_rsync_with_dev_rsa_key(clusterIP, subDirectory, performDryRun);
});

/* Fluorine cluster*/
gulp.task('deploy-build-to-fluorine-ryan', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('AT2');
  subDirectory = '/node/ryan';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-fluorine-vania', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('VVOLSDev');
  subDirectory = '/node/vania';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});

/* VVOLS Development Cluster */
gulp.task('deploy-build-to-vvols-dev', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('VVOLSDev');
  subDirectory = '/node/develop';
  performDryRun = false;
  jenkins_perform_rsync_with_dev_rsa_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-vvols-dev-test', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('VVOLSSaroch');
  subDirectory = '/node/test';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
/* VVOLS Product Cluster */
gulp.task('deploy-build-to-vvols-prod', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('VVOLSProd');
  subDirectory = '/node/vvols2';
  performDryRun = false;
  jenkins_perform_rsync_with_dev_rsa_key(clusterIP, subDirectory, performDryRun);
});
/* VVOLS Saroch Cluster */
gulp.task('deploy-build-to-vvols-saroch', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('VVOLSSaroch');
  subDirectory = '/node/vvols';
  performDryRun = false;
  jenkins_perform_rsync_with_dev_rsa_key(clusterIP, subDirectory, performDryRun);
});
/* VVOLS Saroch Cluster */
gulp.task('deploy-build-to-vvols-vania', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('VVOLSSaroch');
  subDirectory = '/node/vania';
  performDryRun = false;
  jenkins_perform_rsync_with_dev_rsa_key(clusterIP, subDirectory, performDryRun);
});
/* VVOLS Saroch debugCluster */
gulp.task('deploy-build-to-vvols-debug-saroch', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('VVOLSSaroch');
  subDirectory = '/node/vvols-debug';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
/* FibreChannel Cluster from Aaron Jones */
gulp.task('deploy-build-to-FCAaron-aaron', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('FCAaron');
  subDirectory = '/node/aaron';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});
gulp.task('deploy-build-to-FCAaron-aaron-debug', ['build'], function () {
  var clusterIP, subDirectory, performDryRun;
  clusterIP = get_cluster_ip('FCAaron');
  subDirectory = '/node/aaron-debug';
  performDryRun = false;
  perform_rsync_no_key(clusterIP, subDirectory, performDryRun);
});

gulp.task('deploy-build-dev-rsa-key-params', ['build'], function () {
  /* example usage
   gulp deploy-build-dev-rsa-key-params
   --useParams
   --mvip 192.168.139.158
   --elementVersion 9.0
   --deployDirectory test2
   --jenkinsDeploy
   */
  var $ = require('gulp-load-plugins')({pattern: ['yargs']}),
    useParams = $.yargs.argv.useParams === true,
    jenkinsDeploy = $.yargs.argv.jenkinsDeploy === true,
    argv = $.yargs.string(
      'mvip',
      'port',
      'elementVersion',
      'rootDirectory',
      'deployDirectory').argv,
    clusterIP,
    subDirectory,
    performDryRun,
    rootDirectory = argv.rootDirectory ? ('/' + argv.rootDirectory) : '/node',
    deployDirectory = argv.deployDirectory ?  ('/' +argv.deployDirectory) : '/develop',
    mvip = argv.mvip ? argv.mvip : '192.168.139.158',
    webmgmtDirectoryBase = '/sf/etc/webmgmt/',
    versionWebmgmt = '9.0',
    version = argv.elementVersion ? argv.elementVersion : '9.0',
    versionArray = [];
  if (useParams) {
    console.log('parameters detected',argv);
  } else {
    console.log(argv);
    throw 'please add the --useParams flag';
  }
  if(deployDirectory === '/node' && rootDirectory === '/node') {
    deployDirectory = '';
    rootDirectory = '/node';
  }
  if (typeof version === 'string') {
    versionArray = version.split('.').length ? version.split('.') : ['9', '0'];
    if (versionArray.length > 1) {
      versionWebmgmt = versionArray[0] + '.' + versionArray[1];
      webmgmtDirectoryBase = webmgmtDirectoryBase + versionWebmgmt + rootDirectory + deployDirectory;
      console.log('going to attempt to install directory ', webmgmtDirectoryBase);
    }
  } else {
    console.log('elementVersion parameter is not a string ', argv.elementVersion);
  }
  clusterIP = mvip;
  subDirectory = rootDirectory + deployDirectory;
  performDryRun = false;
  if (jenkinsDeploy) {
    jenkins_perform_rsync_with_dev_rsa_key(clusterIP, subDirectory, performDryRun, versionWebmgmt);
  } else {
    perform_rsync_no_key(clusterIP, subDirectory, performDryRun, versionWebmgmt);
  }
});
// This task expects there to be a build directory.
gulp.task('deploy-no-build-dev-rsa-key-params', function () {
  /* example usage
   gulpdeploy-no-build-dev-rsa-key-params--useParams --mvip 172.27.1.57 --elementVersion 9.0.0.0 --rootDirectory cluster --deployDirectory develop --jenkinsDeploy
   */
  var $ = require('gulp-load-plugins')({pattern: ['yargs']}),
    useParams = $.yargs.argv.useParams === true,
    jenkinsDeploy = $.yargs.argv.jenkinsDeploy === true,
    argv = $.yargs.string(
      'mvip',
      'port',
      'elementVersion',
      'rootDirectory',
      'deployDirectory').argv,
    clusterIP,
    subDirectory,
    performDryRun,
    rootDirectory = argv.rootDirectory ? ('/' + argv.rootDirectory) : '/node',
    deployDirectory = argv.deployDirectory ?  ('/' +argv.deployDirectory) : '/develop',
    mvip = argv.mvip ? argv.mvip : '192.168.139.178',
    webmgmtDirectoryBase = '/sf/etc/webmgmt/',
    versionWebmgmt = '9.0',
    majorVersion = '9',
    version = argv.elementVersion ? argv.elementVersion : '9.0',
    versionArray = [];

  if (useParams) {
    console.log('parameters detected',argv);
  } else {
    console.log(argv);
    throw 'please add the --useParams flag';
  }
  if(deployDirectory === '/node' && rootDirectory === '/node') {
    deployDirectory = '';
    rootDirectory = '/node';
  }
  if (typeof version === 'string') {
    versionArray = version.split('.').length ? version.split('.') : ['9', '0'];
    if (versionArray.length > 1) {
      versionWebmgmt = versionArray[0] + '.' + versionArray[1];
      webmgmtDirectoryBase = webmgmtDirectoryBase + versionWebmgmt + rootDirectory + deployDirectory;
      console.log('going to attempt to install directory ', webmgmtDirectoryBase);
    }
  } else {
    console.log('version ', argv.elementVersion);
  }
  clusterIP = mvip;
  subDirectory = rootDirectory + deployDirectory;
  performDryRun = false;
  if (jenkinsDeploy) {
    jenkins_perform_rsync_with_dev_rsa_key(clusterIP, subDirectory, performDryRun, versionWebmgmt);
  } else {
    perform_rsync_no_key(clusterIP, subDirectory, performDryRun, versionWebmgmt);
  }
});
