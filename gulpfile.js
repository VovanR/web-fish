// See: http://gulpjs.com/

var gulp = require('gulp');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var csso = require('csso-stylus');

var changedFile = null;

gulp.task('lint', function () {
    return gulp.src(changedFile || ['./static/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(notify(function (file) {
            if (file.jshint.success) {
                return false;
            }

            var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                    return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
            }).join('\n');

            return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
        }))
        .pipe(jscs());
});

gulp.task('stylus', function () {
    return gulp.src([
            './static/css/style.styl',
        ])
        .pipe(stylus({
            use: [
                autoprefixer('last 2 versions', 'ie 8'),
                csso(),
            ],
        }))
        .pipe(gulp.dest('./static/css/'));
});

gulp.task('watch', function () {
    gulp.watch(['./static/js/**/*.js',], function (e) {
            changedFile = e.path;
            gulp.run('lint');
        });
    gulp.watch(['./static/css/*.styl',], ['stylus']);
});

gulp.task('default', ['lint']);
