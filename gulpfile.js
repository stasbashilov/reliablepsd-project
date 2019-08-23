'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const staticPath = 'static';

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('lint-css', function lintCssTask() {
  const gulpStylelint = require('gulp-stylelint');
 
  return gulp
    .src(['scss/modules/*.scss'])
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

gulp.task('styles', function() {
  return gulp.src('scss/main.scss')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulpIf(!isDevelopment, csso()))
    .pipe(gulp.dest(`${staticPath}/css`))
});

gulp.task('scripts', function() {
  return gulp.src(['js/modules/*.js'])
    .pipe(concat('./main.js'))
    .pipe(gulp.dest(`${staticPath}/js`))
});

gulp.task('copyImages', function() {
  return gulp.src(['images/**.*'])
    .pipe(gulp.dest(`${staticPath}/images/`))
});

gulp.task('clean', function() {
  return del(staticPath, {force: true})
});

gulp.task('build', gulp.series(
  'clean',
  gulp.series('styles', 'scripts', 'copyImages'))
);

gulp.task('watch', function() {
  gulp.watch(['scss/**/*.scss', 'js/modules/*.js'],
    gulp.series('styles', 'scripts'))
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
           baseDir: './',
           directory: true
       }
    });

    browserSync.watch([staticPath + '/**/*.*', '*.html']).on('change', browserSync.reload);
});

gulp.task('dev',
  gulp.series('build', gulp.parallel('watch', 'serve'))
);