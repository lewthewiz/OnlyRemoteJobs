var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

let cleanCSS = require('gulp-clean-css');

gulp.task('bundle-minify', function(){
    return gulp.src(['public/js/angular-chips.js', 'public/js/anchorme.js', 'public/js/app.js', 'public/js/controllers.js', 'public/js/main.js'])
        .pipe(concat('public/js/concat.js'))
        .pipe(rename('dist.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('minify-css', () => {
  return gulp.src('public/css/style.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css/dist'));
});
 
gulp.task('default', ['bundle-minify', 'minify-css'], function(){});