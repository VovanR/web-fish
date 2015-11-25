// See: http://gulpjs.com/

var gulp = require('gulp');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var connect = require('gulp-connect');
var jade = require('gulp-jade');

var argv = require('yargs').argv;
var xo = require('gulp-xo');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');

var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');

// Lint all modules:
// $ gulp lint
// Lint one module:
// $ gulp lint --src src/scripts/main.js
gulp.task('lint', function () {
	var src = argv.src;
	return gulp
		.src(src || [
			'./src/scripts/**/*.js',
			'./gulpfile.js'
		])
		.pipe(xo());
});

// Compile `index` page template
gulp.task('templates', function () {
	gulp.src('./src/index.jade')
		.pipe(jade())
		.pipe(gulp.dest('./build/'))
		.pipe(connect.reload());
});

// Copy images
gulp.task('images', function () {
	gulp.src('./src/i/**/*.*')
		.pipe(gulp.dest('./build/i/'))
		.pipe(connect.reload());
});

// Compile styles
gulp.task('styles', function () {
	gulp
		.src([
			'./src/styles/style.styl'
		])
		.pipe(stylus())
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie >= 8'],
			cascade: false
		}))
		.pipe(csso())
		.pipe(gulp.dest('./build/css/'))
		.pipe(connect.reload());
});

// Compile scripts
gulp.task('scripts', function () {
	rjs({
		baseUrl: 'src/scripts',
		name: '../../bower_components/almond/almond',
		include: ['main'],
		insertRequire: ['main'],
		// exclude: ['jquery'],
		out: 'all.js',
		paths: {
			jquery: '../../bower_components/jquery/jquery'
		},
		shim: {
		},
		wrap: true
	})
	.pipe(uglify())
	.pipe(gulp.dest('./build/js/'))
	.pipe(connect.reload());
});

// Start development connection `http://localhost:8000`
gulp.task('connect', function () {
	connect.server({
		root: 'build',
		port: 8000,
		livereload: true
	});
});

// Clear compiled code
gulp.task('clean', function (cb) {
	rimraf('./build', cb);
});

gulp.task('watch', function () {
	gulp.watch(['./src/index.jade'], ['templates']);
	gulp.watch(['./src/i/**/*.*'], ['images']);
	gulp.watch(['./src/styles/**/*.styl'], ['styles']);
	gulp.watch(['./src/scripts/**/*.js'], ['scripts']);
});

gulp.task('build', ['clean'], function (cb) {
	runSequence(['templates', 'images', 'styles', 'scripts'], cb);
});

gulp.task('default', ['build', 'connect', 'watch']);
