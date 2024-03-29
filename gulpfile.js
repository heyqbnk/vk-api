/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const tsLoader = require('gulp-typescript');
const minify = require('gulp-minify');
const clean = require('gulp-clean');

const tsProject = tsLoader.createProject('tsconfig.json');

function compile() {
  return gulp.src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(minify({
      ext: {
        src: '.src.js',
        min: '.js'
      },
    }))
    .pipe(gulp.dest('dist'));
}

function removeSource() {
  return gulp
    .src('dist/**/*.src.js')
    .pipe(clean({force: true}));
}

function removeDirectory() {
  return gulp.src('./dist', {allowEmpty: true}).pipe(clean({force: true}));
}

exports.default = gulp.series(removeDirectory, compile, removeSource);
