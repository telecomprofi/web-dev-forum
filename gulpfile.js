const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
//const nodemon = require('gulp-nodemon');

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

gulp.task('babel', function () {
  return gulp.src(paths.srcJS)
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest(paths.assetsJS));
});

gulp.task('watch', ['html', 'sass', 'babel'], function(){
  gulp.watch(paths.srcHTML, ['html']);
  gulp.watch(paths.srcCSS, ['sass']);
  gulp.watch(paths.srcJS, ['babel']);
});

gulp.task('default', ['watch']);
