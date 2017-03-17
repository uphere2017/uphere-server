var gulp = require('gulp')
var notify = require('gulp-notify')
var nodemon = require('gulp-nodemon')
var livereload = require('gulp-livereload');

gulp.task('server', function() {
    nodemon({
        script: 'server.js',
        watch: ["server.js"]
    }).on('change', function() {
        gulp.src('server.js')
            .pipe(livereload())
            .pipe(notify('Reloading page, please wait...'));
    });
});

gulp.task('default', ['server']);
