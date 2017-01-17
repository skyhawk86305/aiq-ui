'use strict';
var gulp = require('gulp'),
  path = require('path'),
  $ = require('gulp-load-plugins')({
    pattern: [
      'del',
      'gulp-*',
      'main-bower-files',
      'nib',
      'streamqueue',
      'uglify-save-license',
      'wiredep',
      'plato',
      'yargs',
      'multi-glob'
    ]
  }),
  buildConfig = require('../build.config.js'),
  appScriptFiles = path.join(buildConfig.appDir, '**/*.js'),
  unitTestFiles = path.join(buildConfig.unitTestDir, '**/*.js'),
  e2eTestFiles = path.join(buildConfig.e2eTestDir, '**/*.js'),
  analyze = $.yargs.alias('a', 'analyze').argv.analyze;

gulp.task('tslint', function () {
  return gulp.src([appScriptFiles])
    .pipe($.tslint({formatter: "verbose"}))
    .pipe($.tslint.report({emitError: false}));
});

gulp.task('lint', ['tslint'], function () {
  var onError = function (err) {
    $.notify.onError({
      title: 'Error linting at ' + err.plugin,
      subtitle: ' ', //overrides defaults
      message: err.message.replace(/\u001b\[.*?m/g, ''),
      sound: ' ' //overrides defaults
    })(err);
    this.emit('end');
  };
  return gulp.src([
    unitTestFiles,
    e2eTestFiles
  ])
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .pipe($.jscs());
});

gulp.task('staticAnalysis', function (done) {
  if (analyze) {
    $.multiGlob.glob([appScriptFiles, unitTestFiles, e2eTestFiles], function (err, matches) {
      if (err) { throw new Error('Couldn\'t find files.'); }
      matches = matches.filter(function (file) { return file.match(/.*[.]js/); });

      if (matches.length > 0) {
        var options = {
          jshint: {
            options: {
              node: true,
              esnext: true,
              bitwise: true,
              camelcase: true,
              curly: true,
              eqeqeq: true,
              immed: true,
              indent: 2,
              latedef: "nofunc",
              laxcomma: true,
              newcap: true,
              noarg: true,
              quotmark: "single",
              regexp: true,
              undef: true,
              unused: true,
              strict: true,
              trailing: true,
              smarttabs: true,
              white: true,
              globals: {
                angular: true,
                spyOn: true
              }
            }
          }
        };

        $.plato.inspect(matches, './report', options, function () { done(); });
      } else { done(); }
    });
  } else { done(); }
});

gulp.task('analyze', ['lint', 'staticAnalysis']);
