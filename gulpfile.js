'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', [
  'scripts',
  'styles',
  'static',
  'templates'
])

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('styles', function() {
  console.log('ran styles');
});

gulp.task('static', function() {
  console.log('ran static');
});

gulp.task('templates', function() {
  return gulp.src('src/templates/**/*.html')
    .pipe(gulp.dest('build'));
});
