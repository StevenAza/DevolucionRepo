var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require("cssnano");
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// compile scss into css

function style() {
    // 1. where is my scss file
    return gulp
    .src('./scss/**/*.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
    // 2. pass that file through sass compiler 
    .pipe(sass())
    // 3. compiler autoprefixer browser
    .pipe(postcss([ autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    // 4. where do I save the compiled css?
    .pipe(gulp.dest('./css'))
    // 5. stream changes to all browser
    .pipe(browserSync.stream());

}

function watch() {
    browserSync.init();
    gulp.watch('./scss/**/*.scss', style);
}

exports.style = style;
exports.watch = watch;