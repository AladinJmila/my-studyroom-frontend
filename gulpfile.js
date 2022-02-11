const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');

function buildStyles() {
  return (
    src('src/styles/**/*.scss')
      .pipe(sass())
      // .pipe(purgecss({ content: ['public/index.html', 'src/**/*.jsx'] }))
      .pipe(dest('src'))
  );
}

function watchTask() {
  watch(['src/**/*.scss'], buildStyles);
}

exports.default = series(buildStyles, watchTask);
