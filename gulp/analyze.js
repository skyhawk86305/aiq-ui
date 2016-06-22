'use strict';
var gulp = require('gulp')
  , path = require('path')
  , $ = require('gulp-load-plugins')({
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
  })
  , appBase = require('../build.config.js').appDir
  , appScriptFiles = path.join(appBase, '**/*.{coffee,js}')
  , e2eFiles = 'e2e/**/*.{coffee,js}'
  , cukeFiles = 'features/**/*.{coffee,js}'
  , unitTests = path.join(require('../build.config.js').unitTestDir, '**/*_test.{coffee,js}')
  , analyze = $.yargs.argv.hasOwnProperty('analyze');
// lint CoffeeScript and jshint and jscs JavaScript
gulp.task('lint', function () {
  var jsFilter = $.filter('**/*.js')
    , onError = function (err) {
      $.notify.onError({
        title: 'Error linting at ' + err.plugin,
        subtitle: ' ', //overrides defaults
        message: err.message.replace(/\u001b\[.*?m/g, ''),
        sound: ' ' //overrides defaults
      })(err);
      this.emit('end');
    };
  return gulp.src([
    appScriptFiles,
    e2eFiles,
    unitTests
  ])
    .pipe($.plumber({errorHandler: onError}))
    .pipe(jsFilter)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .pipe($.jscs());
});
// lint CoffeeScript and jshint and jscs JavaScript
gulp.task('lint-features', function () {
  var jsFilter = $.filter('**/*.js')
    , onError = function (err) {
    $.notify.onError({
      title: 'Error linting at ' + err.plugin,
      subtitle: ' ', //overrides defaults
      message: err.message.replace(/\u001b\[.*?m/g, ''),
      sound: ' ' //overrides defaults
    })(err);
    this.emit('end');
  };
  return gulp.src([
      cukeFiles
    ])
    .pipe($.plumber({errorHandler: onError}))
    .pipe(jsFilter)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .pipe($.jscs());
});

gulp.task('staticAnalysis', function (done) {
  $.multiGlob.glob([appScriptFiles, e2eFiles, unitTests], function (err, matches) {
    if (err) {
      throw new Error('Couldn\'t find files.');
    }

    // only inspect JS (ES5) files
    matches = matches.filter(function (file) {
      return file.match(/.*[.]js/);
    });

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
              spyOn: false
            }
          }
        }
      };
      $.plato.inspect(matches, './report', options, function () {
        done();
      });
    } else {
      done();
    }
  });
});
gulp.task('analyze', ['lint', 'staticAnalysis']);
