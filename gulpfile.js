var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var server = require('gulp-express');
var concat = require('gulp-concat');
 
gulp.task('concatapp', function() {
  return gulp.src(['assets/vendor/essentials/**/*.js'])
    .pipe(concat('essentials.js'))
    .pipe(gulp.dest('public/'));
});

var files = [{path: 'assets/react/views/HelloWorld.jsx', source: 'HelloWorld.js'}];

gulp.task('browserify:js', function(){
	//files.forEach(function(file){
		browserify('assets/react/main.jsx')
			.transform(reactify)
			.bundle()
			.pipe(source('main.js'))
			.pipe(gulp.dest('public/react/'));
	//});
});

gulp.task('sass', function () {
  gulp.src('assets/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('js', function () {    
  gulp.src('assets/react/components/**/*.jsx')
    .pipe(babel())
    .pipe(gulp.dest('public/react/components'));

    gulp.src('assets/react/wrapper.jsx')
    .pipe(babel())
    .pipe(gulp.dest('public/react/'));
});

gulp.task('copyvendor', function() {
   gulp.src('assets/vendor/*.*')
   .pipe(gulp.dest('public/'));
});

gulp.task('copyimages', function() {
   gulp.src('assets/images/**/*.*')
   .pipe(gulp.dest('public/images/'));
});

gulp.task('watch', function() {
    gulp.watch("assets/react/**/*.jsx", ["js", "browserify:js"])
});

gulp.task('sass:watch', function () {
  gulp.watch('assets/stylesheets/**/*.scss', ['sass']);
});

gulp.task('default', ['js', 'sass', 'copyvendor','browserify:js','concatapp', 'copyimages', 'watch', 'sass:watch']);
