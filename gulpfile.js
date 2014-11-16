// See: http://gulpjs.com/

var gulp = require('gulp');
var connect = require('gulp-connect');

var argv = require('yargs').argv;
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
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
        .src(
            src ||
            [
                './src/scripts/**/*.js',
                './gulpfile.js',
            ]
        )
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs());
});

gulp.task('html', function () {
    gulp.src('./dist/*.html')
        .pipe(connect.reload());
});

gulp.task('styles', function () {
    gulp.src([
            './src/styles/style.styl',
        ])
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 8'],
            cascade: false,
        }))
        .pipe(csso())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(connect.reload());
});

gulp.task('scripts', function () {
    gulp.src([
            './src/scripts/main.js',
        ])
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: 8000,
        livereload: true,
    });
});

gulp.task('watch', function () {
    gulp.watch(['./dist/*.html'], ['html']);
    gulp.watch(['./src/styles/**/*.styl'], ['styles']);
    gulp.watch(['./src/scripts/**/*.js'], ['scripts']);
});

gulp.task('dist', ['styles', 'lint', 'scripts']);

gulp.task('default', ['connect', 'watch']);
