const gulp         = require('gulp');
const del          = require('del');
const jshint       = require('gulp-jshint');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const source       = require('vinyl-source-stream');
const browserify   = require('browserify');
const babelify     = require('babelify');
const mongodbData  = require('gulp-mongodb-data');

const paths = {
  srcClient: 'app_client/src/**/*',
  srcClientHTML: 'app_client/**/*.html',
  srcClientCSS: 'app_client/src/sass/**/*.scss',
  srcClientJS: 'app_client/**/*.js',
  srcClientImg: 'app_client/favicon.ico',
  
  srcServerJS: 'app_server/**/*.js',

  dbMetadata: './dbMetadata/*.json',

  assets: 'assets',
  assetsIndex: 'assets/index.html',
  assetsCSS: 'assets/css/',
  assetsJS: 'assets/',
  assetsImg: 'assets/',
  
  dist: 'dist',
  distIndex: 'dist/index.html'
};

gulp.task('clean', function () {
  return del.sync('assets');
});

gulp.task('img', function () {
  return gulp.src(paths.srcClientImg)
    .pipe(gulp.dest(paths.assetsImg));
});

gulp.task('html', function () {
  return gulp.src(paths.srcClientHTML)
    .pipe(gulp.dest(paths.assets));
});

gulp.task('jshintClient', function () {
    return gulp.src(paths.srcClientJS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('jshintServer', function () {
    return gulp.src(paths.srcServerJS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
  return gulp.src(paths.srcClientCSS)
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

// Load JSON files, using file names as collection names
// and dropping the collections before bulk inserting data
gulp.task('metadata', function() {
  gulp.src(paths.dbMetadata)
    .pipe(mongodbData({
      mongoUrl: process.env.DB_URL || 'mongodb://localhost/webdevforum',
      dropCollection: true
    }))
})

gulp.task('watch', ['clean', 'img', 'html', 'sass', 'browserify'], function(){
  gulp.watch(paths.srcClientJS, ['jshintClient']);
  gulp.watch(paths.srcClientJS, ['jshintServer']);
  gulp.watch(paths.srcClientHTML, ['html']);
  gulp.watch(paths.srcClientCSS, ['sass']);
  gulp.watch(paths.srcClientJS, ['browserify']);
});

gulp.task('default', ['metadata', 'jshintClient', 'jshintServer', 'watch']);
