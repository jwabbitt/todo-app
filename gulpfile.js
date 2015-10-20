'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var express = require('express');
var livereload = require('gulp-livereload');
var please = require('gulp-pleeease');

gulp.task('default', [
  'scripts',
  'styles',
  'static',
  'templates'
]);

gulp.task('watch', [
  'scripts.watch',
  'styles.watch',
  'static.watch',
  'templates.watch',
  'server',
  'livereload'
]);

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('build/js'));
});
gulp.task('scripts.watch', ['scripts'], function() {
  gulp.watch('src/scripts/**/*.js', ['scripts']);
});

gulp.task('styles', function() {
  return gulp.src('src/styles/**/*.css')
    .pipe(sourcemaps.init())
      .pipe(concat('app.min.css'))
      .pipe(please())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('build/css'));
});
gulp.task('styles.watch', ['styles'], function() {
  gulp.watch('src/styles/**/*.css', ['styles']);
});

gulp.task('static', function() {
  return gulp.src('src/static/**')
    .pipe(gulp.dest('build'));
});
gulp.task('static.watch', ['static'], function() {
  gulp.watch('src/static/**', ['static']);
});

gulp.task('templates', function() {
  return gulp.src('src/templates/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'));
});
gulp.task('templates.watch', ['templates'], function() {
  gulp.watch('src/templates/**/*.html', ['templates']);
});

gulp.task('server', function() {
  var app = express();
  app.use(express.static('build'));
  app.listen(8000);
});

gulp.task('livereload', function() {
  var server = livereload.listen();
  gulp.watch('build/**', function(event) {
    livereload.changed(event);
  });
});
