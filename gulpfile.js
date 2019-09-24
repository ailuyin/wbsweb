let gulp = require('gulp');
let concat = require('gulp-concat');
let { default: jsmin } = require('gulp-uglify-es');
let cssmin = require('gulp-cssmin');
let less = require('gulp-less');

app = {
    src : './node_modules/bootstrap',
    dest : './node_modules/bootstrap/dest'
}

gulp.task('bootstrap',function(done){
    gulp.src(`${app.src}/fonts`)
        .pipe(gulp.dest(app.dest));
    gulp.src(`${app.src}/fonts/**`)
        .pipe(gulp.dest(`${app.dest}/fonts`));

    gulp.src(`${app.src}/less`)
        .pipe(gulp.dest(app.dest));
    gulp.src(`${app.src}/less/bootstrap.less`)
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest(`${app.dest}/less`));

    gulp.src(`${app.src}/js`)
        .pipe(gulp.dest(app.dest));
    gulp.src(`${app.src}/js/**`)
        .pipe(jsmin())
        .pipe(concat('bootstrap.js'))
        .pipe(gulp.dest(`${app.dest}/js`));
    done();
});