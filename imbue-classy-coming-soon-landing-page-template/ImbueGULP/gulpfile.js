'use strict';

var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    bourbon        = require('node-bourbon'),
    autoprefixer   = require('gulp-autoprefixer'),
    cleanCSS       = require('gulp-clean-css'),
    cssbeautify    = require('gulp-cssbeautify'),
    browserSync    = require('browser-sync'),
    rename         = require('gulp-rename'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    del            = require('del'),
    cache          = require('gulp-cache');

// Browser-sync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: true
  });
});

// Sass compilation
gulp.task('sass', function() {
  return gulp.src('sass/**/*.sass')
  .pipe(sass({
    includePaths: bourbon.includePaths
  }))
  .pipe(rename({
    suffix: '.min',
    prefix : ''
  }))
  .pipe(autoprefixer(['last 15 versions', 'ie >= 7', 'Firefox < 20']))
  .pipe(cleanCSS())
  .pipe(gulp.dest('dist/source-files/imbue-css-min-files'))
});

// CSS compilation
gulp.task('css', function() {
  return gulp.src('sass/**/*.sass')
  .pipe(sass({
    includePaths: bourbon.includePaths,
    outputStyle: 'expanded'
  }))
  .pipe(autoprefixer(['last 15 versions', 'ie >= 7', 'Firefox < 20']))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}));
});

// Unminified CSS to Source-files Folder
gulp.task('buildexpandedcss', function() {
  return gulp.src('sass/**/*.sass')
  .pipe(sass({
    includePaths: bourbon.includePaths,
    outputStyle: 'expanded'
  }))
  .pipe(autoprefixer(['last 15 versions', 'ie >= 7', 'Firefox < 20']))
  .pipe(gulp.dest('dist/source-files/imbue-css-files'));
});

// Deject tag delete and beautiful html - for deject tag pages only
gulp.task('buildhtml', function() {
  gulp.src(['app/*.html'])
    .pipe(gulp.dest('dist/'))
});

// JS libs minification
gulp.task('libs', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/modernizr/modernizr.js',
    'bower_components/jquery.transit/jquery.transit.js',
    'bower_components/jquery-mousewheel/jquery.mousewheel.js',
    'bower_components/swiper/dist/js/swiper.js',
    'bower_components/kbw-countdown/dist/js/jquery.plugin.min.js',
    'bower_components/kbw-countdown/dist/js/jquery.countdown.min.js',
    'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
    'bower_components/jquery-css-skills-bar-master/js/skill.bars.jquery.js',
    'bower_components/photoswipe/dist/photoswipe.js',
    'bower_components/photoswipe/dist/photoswipe-ui-default.js',
    'bower_components/ajaxchimp/jquery.ajaxchimp.min.js',
    'bower_components/particles.js/particles.min.js',
    'bower_components/vegas/dist/vegas.js',
    'bower_components/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.js',
    'app_components/app.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

// JS Libs Unminified
gulp.task('buildexpandedlibs', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/modernizr/modernizr.js',
    'bower_components/jquery.transit/jquery.transit.js',
    'bower_components/jquery-mousewheel/jquery.mousewheel.js',
    'bower_components/swiper/dist/js/swiper.js',
    'bower_components/kbw-countdown/dist/js/jquery.plugin.min.js',
    'bower_components/kbw-countdown/dist/js/jquery.countdown.min.js',
    'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
    'bower_components/jquery-css-skills-bar-master/js/skill.bars.jquery.js',
    'bower_components/photoswipe/dist/photoswipe.js',
    'bower_components/photoswipe/dist/photoswipe-ui-default.js',
    'bower_components/ajaxchimp/jquery.ajaxchimp.min.js',
    'bower_components/particles.js/particles.min.js',
    'bower_components/vegas/dist/vegas.js',
    'bower_components/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.js',
    'app_components/app.js'
  ])
  .pipe(concat('libs.js'))
  .pipe(gulp.dest('dist/source-files/imbue-js-files'));
});

// Watch
gulp.task('watch', ['css', 'libs', 'browser-sync'], function() {
  gulp.watch('sass/**/*.sass', ['css']).on("change", browserSync.reload);
  gulp.watch('app/*.html').on("change", browserSync.reload);
  gulp.watch('app/js/**/*.js').on("change", browserSync.reload);
});

// Images
gulp.task('pics', function() {
  return gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'));
});

// Remove "dist" folder
gulp.task('clean', function() {
  return del.sync('dist');
});

// Build
gulp.task('build', ['clean', 'sass', 'buildhtml', 'pics', 'libs', 'buildexpandedcss', 'buildexpandedlibs'], function() {

  var buildCss = gulp.src([
    'app/css/plugins.css',
    'app/css/main.css',
    'app/css/plugins-demo.css',
    'app/css/main-demo.css'
  ])
  .pipe(gulp.dest('dist/css'));

  var buildLoaders = gulp.src([
    'app/css/loaders/*.css'
  ])
  .pipe(gulp.dest('dist/css/loaders'));

  var buildFiles = gulp.src([
    'app/.htaccess',
    'app/mail.php'
  ]).pipe(gulp.dest('dist'));

  var buildIESupport = gulp.src([
    'bower_components/es5-shim/es5-shim.min.js',
    'bower_components/html5shiv/dist/html5shiv.min.js',
    'bower_components/html5shiv/dist/html5shiv-printshiv.min.js',
    'bower_components/respond/dest/respond.min.js'
  ]).pipe(gulp.dest('dist/js/libs'));

  var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));

  // Unminificated Template JS Files
  var buildUnminifiedJs = gulp.src([
    'app_components/app.js',
    'app/js/demo/app-demo.js',
    'app/js/gallery-init.js',
    'app/js/imbue-custom.js'
  ])
  .pipe(gulp.dest('dist/source-files/imbue-js-files'));

});

// Clear cache
gulp.task('clearcache', function () {
  return cache.clearAll();
});

// Default task
gulp.task('default', ['watch']);
