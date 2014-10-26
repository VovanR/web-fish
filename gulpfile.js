// See: http://gulpjs.com/

var gulp = require('gulp');
var argv = require('yargs').argv;
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var csso = require('csso-stylus');

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

gulp.task('stylus', function () {
    return gulp.src([
            './static/css/style.styl',
        ])
        .pipe(stylus({
            use: [
                autoprefixer('last 2 versions', 'ie >= 8'),
                csso(),
            ],
        }))
        .pipe(gulp.dest('./static/css/'));
});

gulp.task('watch', function () {
    gulp.watch(['./static/css/*.styl',], ['stylus']);
});

gulp.task('default', ['lint']);
