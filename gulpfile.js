/**
 * Prerequisites: npm, gulp
 *
 * Setup:
 * - Install the node modules with "npm install"
 * - Run gulp and browser-sync with "gulp watch"
 *
 * Commands:
 * gulp				Build the files once
 * gulp watch		Watch for file changes and perform the correct tasks
 * gulp styles		Compiles SASS and injects the new CSS into your webpage
 * gulp scripts 	Concats and uglifies js/src into one file
 * gulp images 		Compresses images
 */

// Project options
var options = {
	'browser-sync': false,
	'domain': '',
	'js-file': 'js.js'
}

// Dependencies
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minify = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin');

if (options['browser-sync']) {
	var browserSync = require('browser-sync').create();
}

/**
 * Run the tasks once
 */
gulp.task('default', ['styles', 'scripts', 'images']);

/**
 * Watch for file changes and perform the correct tasks
 */
gulp.task('watch', function()
{
	if (options['browser-sync']) {
		browserSync.init({
			proxy: options['domain']
		});
		console.log('Running browser-sync from proxy "' + options['domain'] + '"');
	} else {
		console.log('Not running browser-sync');
	}

	console.log('Compiling JS to file "' + options['js-file'] + '"');

	gulp.watch('scss/**/*.scss', ['styles']);

	if (options['browser-sync']) {
		gulp.watch('js/src/**/*.js', ['scripts']).on('change', browserSync.reload);
		gulp.watch('**/*.php').on('change', browserSync.reload);
		gulp.watch('images/**/*', ['images']);
	} else {
		gulp.watch('js/src/**/*.js', ['scripts']);
		gulp.watch('images/**/*', ['images']);
	}
});

/**
 * Compiles SASS and injects the new CSS into your webpage
 */
gulp.task('styles', function()
{
	var process = sass('scss')
		.pipe(autoprefixer())
		.pipe(minify())
		.pipe(gulp.dest('css'));

	if (options['browser-sync']) {
		process = process.pipe(browserSync.stream());
	}

	return process;
});

/**
 * Concats and uglifies js/src into one file
 */
gulp.task('scripts', function()
{
	return gulp.src('js/src/**/*.js')
		.pipe(concat(options['js-file']))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});

/**
 * Compresses images
 */
gulp.task('images', function()
{
	var process = gulp.src('images/**/*')
		.pipe(imagemin({
			optimizationLevel: 7,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('images'));

	if (options['browser-sync']) {
		process = process.pipe(browserSync.stream());
	}

	return process;
});
