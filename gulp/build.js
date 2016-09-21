'use strict';
var gulp = require('gulp')
  , path = require('path')
  , rebaseUrls = require('gulp-css-rebase-urls')
  , $ = require('gulp-load-plugins')({
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
  })
  , buildConfig = require('../build.config.js')
  , appBase = buildConfig.appDir
  , appFontFiles = path.join(appBase, 'fonts/**/*')
  , appImages = path.join(appBase, 'images/**/*')
  , extImages = 'bower_components/sf-components/dist/images/**/*'
  , extPages = 'bower_components/sf-components/dist/*.html'
  , appMarkupFiles = path.join(appBase, '**/*.{htm,html}')
  , appScriptFiles = path.join(appBase, '**/*.{js,json}')
  , appStyleFiles = path.join(appBase, '**/*.{css,less}')
  , isProd = $.yargs.argv.prod;

// delete build directory
gulp.task('clean', function (cb) {
  return $.del(buildConfig.buildDir, cb);
});
gulp.task('clean-debug', function (cb) {
  return $.del(buildConfig.buildDebugDir, cb);
});

// compile markup files and copy into build directory
gulp.task('markup', ['clean'], function () {
  //ToDo:  if (isProd) { minify and convert to js } //need to resolve issue with relative pathing of templateUrls
  return gulp.src([appMarkupFiles])
    .pipe(gulp.dest(buildConfig.buildDir));
});

// compile styles and copy into build directory
gulp.task('styles', ['clean'], function () {
  var lessFilter = $.filter('**/*.less', {restore: true})
    , onError = function (err) {
      $.notify.onError({
        title: 'Error linting at ' + err.plugin,
        subtitle: ' ', //overrides defaults
        message: err.message.replace(/\u001b\[.*?m/g, ''),
        sound: ' ' //overrides defaults
      })(err);
      this.emit('end');
    };
  return gulp.src([appStyleFiles])
    .pipe($.plumber({errorHandler: onError}))
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

// compile scripts and copy into build directory
gulp.task('scripts', ['clean', 'analyze', 'markup'], function () {
  var jsFilter = $.filter('**/*.js', {restore: true});
  return gulp.src([
    appScriptFiles,
    '!**/index.html'
  ])
    .pipe(jsFilter)
    .pipe($.if(isProd, $.angularFilesort()))
    .pipe($.if(isProd, $.concat('app.js')))
    .pipe($.if(isProd, $.ngAnnotate()))
    .pipe($.if(isProd, $.uglify()))
    .pipe($.if(isProd, $.rev()))
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
    .pipe(gulp.dest(buildConfig.buildDir));
});

// copy bower components into build directory
gulp.task('bowerCopy', ['inject'], function () {
  var cssFilter = $.filter('**/*.css', {restore: true})
    , jsFilter = $.filter('**/*.js', {restore: true})
    , stream = $.streamqueue({objectMode: true})
    , wiredep = $.wiredep({exclude: [/bootstrap[.]js/]});
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

// copy all bower components into build directory (including devDependencies)
gulp.task('bowerCopy:dev', ['inject'], function () {
  var cssFilter = $.filter('**/*.css', {restore: true})
    , jsFilter = $.filter('**/*.js', {restore: true})
    , stream = $.streamqueue({objectMode: true})
    , wiredep = $.wiredep({devDependencies: true});
  if (wiredep.js) {
    stream.queue(gulp.src(wiredep.js));
  }
  if (wiredep.css) {
    stream.queue(gulp.src(wiredep.css));
  }
  return stream.done()
    .pipe(cssFilter)
    .pipe(gulp.dest(buildConfig.extCss))
    .pipe(cssFilter.restore)
    .pipe(jsFilter)
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
        exclude: [/bootstrap[.]js/],
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

// inject all bower components into index.html (including devDependencies)
gulp.task('bowerInject:dev', ['bowerCopy:dev'], function () {
  return gulp.src([buildConfig.buildDir + 'index.html'])
    .pipe($.wiredep.stream({
      devDependencies: true,
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

//Injects bower devDependencies into html
gulp.task('build:dev', ['bowerInject:dev', 'images', 'fonts', 'extPages']);
