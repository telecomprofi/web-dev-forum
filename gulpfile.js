const gulp         = require('gulp');
const del          = require('del');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const source       = require('vinyl-source-stream');
const browserify   = require('browserify');
const babelify     = require('babelify');

const paths = {
  src: 'app_client/src/**/*',
  srcHTML: 'app_client/**/*.html',
  srcCSS: 'app_client/src/sass/**/*.scss',
  srcJS: 'app_client/**/*.js',
  
  assets: 'assets',
  assetsIndex: 'assets/index.html',
  assetsCSS: 'assets/css/',
  assetsJS: 'assets/',
  
  dist: 'dist',
  distIndex: 'dist/index.html'
};

gulp.task('clean', function () {
  return del.sync('assets');
});

gulp.task('html', function () {
  return gulp.src(paths.srcHTML)
    .pipe(gulp.dest(paths.assets));
});

gulp.task('sass', function () {
  return gulp.src(paths.srcCSS)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions','>1%','ie 9']))
    .pipe(gulp.dest(paths.assetsCSS));
});

gulp.task('browserify', function() {
  return browserify('app_client/app.js', {debug: true})
      .transform(babelify, {presets: ["es2015"]})
      .bundle()
      .pipe(source('main.js'))
      .pipe(gulp.dest(paths.assetsJS));
});

gulp.task('watch', ['clean', 'html', 'sass', 'browserify'], function(){
  gulp.watch(paths.srcHTML, ['html']);
  gulp.watch(paths.srcCSS, ['sass']);
  gulp.watch(paths.srcJS, ['browserify']);
});

gulp.task('default', ['watch']);
