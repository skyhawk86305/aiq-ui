'use strict';
var gulp = require('gulp'),
  path = require('path'),
  rebaseUrls = require('gulp-css-rebase-urls'),
  $ = require('gulp-load-plugins')({
    pattern: [
      'del',
      'gulp-*',
      'main-bower-files',
      'nib',
      'streamqueue',
      'uglify-save-license',
      'wiredep',
      'yargs'
    ]
  }),
  buildConfig = require('../build.config.js'),
  tsProject = $.typescript.createProject('./tsconfig.json'),
  tsProjectTest = $.typescript.createProject('./tsconfig.json'),
  appBase = buildConfig.appDir,
  appFontFiles = path.join(appBase, 'fonts/**/*'),
  appImages = path.join(appBase, 'images/**/*'),
  extImages = 'bower_components/sf-components/dist/images/**/*',
  extPages = 'bower_components/sf-components/dist/*.html',
  appMarkupFiles = path.join(appBase, '**/*.html'),
  appScriptFiles = path.join(appBase, '**/*.ts'),
  appStyleFiles = path.join(appBase, '**/*.less'),
  unitTestFiles = path.join(buildConfig.unitTestDir, '**/*.spec.ts'),
  isProd = $.yargs.argv.prod,
  googleAnalyticsToken = $.yargs.argv.googleAnalyticsToken || '';

// delete build directory
gulp.task('clean', function (cb) {
  return $.del(buildConfig.buildDir, cb);
});

gulp.task('clean-debug', function (cb) {
  return $.del(buildConfig.buildDebugDir, cb);
});

// compile markup files and copy into build directory
gulp.task('markup', ['clean'], function () {
  return gulp.src([appMarkupFiles])
    .pipe(gulp.dest(buildConfig.buildDir));
});

// compile styles and copy into build directory
gulp.task('styles', ['clean'], function () {
  var lessFilter = $.filter('**/*.less', {restore: true});

  return gulp.src([appStyleFiles])
    .pipe($.plumber({errorHandler: function (err) {
      $.notify.onError({
        title: 'Error linting at ' + err.plugin,
        subtitle: ' ', //overrides defaults
        message: err.message.replace(/\u001b\[.*?m/g, ''),
        sound: ' ' //overrides defaults
      })(err);
      this.emit('end');
    }}))
    .pipe(lessFilter)
    .pipe($.less())
    .pipe(lessFilter.restore)
    .pipe($.autoprefixer())
    .pipe($.if(isProd, $.concat('app.css')))
    .pipe($.if(isProd, rebaseUrls()))
    .pipe($.if(isProd, $.cssmin()))
    .pipe($.if(isProd, $.rev()))
    .pipe(gulp.dest(buildConfig.buildCss));
});

// compile tests and copy into build directory
gulp.task('tests', function () {
  var jsFilter = $.filter('**/*.js', {restore: true}),
    tsFilter = $.filter('**/*.ts', {restore: true});

  return gulp.src([unitTestFiles])
    .pipe($.sourcemaps.init())
    .pipe(tsFilter)
    .pipe(tsProjectTest())
    .pipe(tsFilter.restore)
    .pipe(jsFilter)
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(buildConfig.buildTest))
    .pipe(jsFilter.restore);
});

// compile scripts and copy into build directory
gulp.task('scripts', ['clean', 'analyze', 'markup'], function () {
  var jsFilter = $.filter('**/*.js', {restore: true}),
    tsFilter = $.filter('**/*.ts', {restore: true});

  return gulp.src([appScriptFiles])
    .pipe($.sourcemaps.init())
    .pipe(tsFilter)
    .pipe(tsProject())
    .pipe(tsFilter.restore)
    .pipe(jsFilter)
    .pipe($.if(isProd, $.angularFilesort()))
    .pipe($.if(isProd, $.concat('app.js')))
    .pipe($.if(isProd, $.ngAnnotate()))
    .pipe($.if(isProd, $.uglify()))
    .pipe($.if(isProd, $.rev()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(buildConfig.buildJs))
    .pipe(jsFilter.restore);
});

// inject custom CSS and JavaScript into index.html
gulp.task('inject', ['markup', 'styles', 'scripts'], function () {
  var jsFilter = $.filter('**/*.js', {restore: true});

  return gulp.src([buildConfig.buildDir + 'index.html'])
    .pipe($.inject(gulp.src([
      buildConfig.buildCss + '**/*',
      buildConfig.buildJs + '**/*'
    ])
      .pipe(jsFilter)
      .pipe($.angularFilesort())
      .pipe(jsFilter.restore), {
      addRootSlash: false,
      ignorePath: buildConfig.buildDir
    }))
    .pipe($.if(isProd, $.replace('{googleAnalyticsToken}', googleAnalyticsToken)))
    .pipe(gulp.dest(buildConfig.buildDir));
});

// copy bower components into build directory
gulp.task('bowerCopy', ['inject'], function () {
  var cssFilter = $.filter('**/*.css', {restore: true}),
    jsFilter = $.filter('**/*.js', {restore: true}),
    stream = $.streamqueue({objectMode: true}),
    wiredep = $.wiredep();
  if (wiredep.js) {
    stream.queue(gulp.src(wiredep.js));
  }
  if (wiredep.css) {
    stream.queue(gulp.src(wiredep.css));
  }
  return stream.done()
    .pipe(cssFilter)
    .pipe($.if(isProd, $.concat('vendor.css')))
    .pipe($.if(isProd, $.cssmin()))
    .pipe($.if(isProd, $.rev()))
    .pipe(gulp.dest(buildConfig.extCss))
    .pipe(cssFilter.restore)
    .pipe(jsFilter)
    .pipe($.if(isProd, $.concat('vendor.js')))
    .pipe($.if(isProd, $.uglify({
      preserveComments: $.uglifySaveLicense
    })))
    .pipe($.if(isProd, $.rev()))
    .pipe(gulp.dest(buildConfig.extJs))
    .pipe(jsFilter.restore);
});

// inject bower components into index.html
gulp.task('bowerInject', ['bowerCopy'], function () {
  if (isProd) {
    return gulp.src(buildConfig.buildDir + 'index.html')
      .pipe($.inject(gulp.src([
        buildConfig.extCss + 'vendor*.css',
        buildConfig.extJs + 'vendor*.js'
      ], {
        read: false
      }), {
        starttag: '<!-- bower:{{ext}} -->',
        endtag: '<!-- endbower -->',
        addRootSlash: false,
        ignorePath: buildConfig.buildDir
      }))
      .pipe($.htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        preserveLineBreaks: true
      }))
      .pipe(gulp.dest(buildConfig.buildDir));
  } else {
    return gulp.src([buildConfig.buildDir + 'index.html'])
      .pipe($.wiredep.stream({
        fileTypes: {
          html: {
            replace: {
              css: function (filePath) {
                return '<link rel="stylesheet" href="' + buildConfig.extCss.replace(buildConfig.buildDir, '') +
                  filePath.split('/').pop() + '">';
              },
              js: function (filePath) {
                return '<script src="' + buildConfig.extJs.replace(buildConfig.buildDir, '') +
                  filePath.split('/').pop() + '"></script>';
              }
            }
          }
        }
      }))
      .pipe(gulp.dest(buildConfig.buildDir));
  }
});

// copy custom fonts into build directory
gulp.task('fonts', ['fontsBower'], function () {
  var fontFilter = $.filter('**/*.{eot,otf,svg,ttf,woff,woff2}', {restore: true});
  return gulp.src([appFontFiles])
    .pipe(fontFilter)
    .pipe(gulp.dest(buildConfig.buildFonts))
    .pipe(fontFilter.restore);
});

// copy Bower fonts into build directory
gulp.task('fontsBower', ['clean'], function () {
  var fontFilter = $.filter('**/*.{eot,otf,svg,ttf,woff,woff2}', {restore: true});
  return gulp.src($.mainBowerFiles())
    .pipe(fontFilter)
    .pipe(gulp.dest(buildConfig.extFonts))
    .pipe(fontFilter.restore);
});

// copy and optimize app images into build directory
gulp.task('images', ['imagesBower'], function () {
  return gulp.src(appImages)
    .pipe($.if(isProd, $.imagemin()))
    .pipe(gulp.dest(buildConfig.buildImages));
});

// copy shared pages from sf-components
gulp.task('extPages', ['clean'], function () {
  return gulp.src(extPages)
    .pipe(gulp.dest(buildConfig.buildDir));
});

// copy and optimize Bower images into build directory
gulp.task('imagesBower', ['clean'], function () {
  return gulp.src(extImages)
    .pipe($.if(isProd, $.imagemin()))
    .pipe(gulp.dest(buildConfig.extImages));
});

gulp.task('build', ['bowerInject', 'images', 'fonts', 'extPages'], function() {
  return gulp.src(buildConfig.buildDir+'**/*')
    .pipe($.zip('build.zip'))
    .pipe(gulp.dest('.'));

});
