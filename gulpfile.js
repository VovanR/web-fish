// See: http://gulpjs.com/

var gulp = require('gulp');
var connect = require('gulp-connect');
var argv = require('yargs').argv;
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');

// Lint all modules:
// $ gulp lint
// Lint one module:
// $ gulp lint --src=foo
// $ gulp lint --src foo
gulp.task('lint', function () {
    var src = argv.src;
    return gulp
        .src(
            src ||
            [
                './static/js/**/*.js',
                './gulpfile.js',
            ]
        )
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs());
});

gulp.task('html', function () {
    gulp.src('./static/index.html')
        .pipe(connect.reload());
});

gulp.task('stylus', function () {
    gulp.src([
            './static/css/style.styl',
        ])
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 8'],
            cascade: false,
        }))
        .pipe(csso())
        .pipe(gulp.dest('./static/css/'))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        root: 'static',
        port: 8000,
        livereload: true,
    });
});

gulp.task('watch', function () {
    gulp.watch(['./static/index.html'], ['html']);
    gulp.watch(['./static/css/**/*.styl'], ['stylus']);
});

gulp.task('default', ['connect', 'watch']);
