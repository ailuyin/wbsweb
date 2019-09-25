let gulp = require('gulp');
let concat = require('gulp-concat');
let { default: jsmin } = require('gulp-uglify-es');
let cssmin = require('gulp-cssmin');
let less = require('gulp-less');

app = {
    src : './node_modules/bootstrap',
    dest : './dest',
    // js: [
    //     './node_modules/bootstrap/js/transition.js',
    //     './node_modules/bootstrap/js/alert.js',
    //     './node_modules/bootstrap/js/button.js',
    //     './node_modules/bootstrap/js/carousel.js',
    //     './node_modules/bootstrap/js/collapse.js',
    //     './node_modules/bootstrap/js/dropdown.js',
    //     './node_modules/bootstrap/js/modal.js',
    //     './node_modules/bootstrap/js/tooltip.js',
    //     './node_modules/bootstrap/js/popover.js',
    //     './node_modules/bootstrap/js/scrollspy.js',
    //     './node_modules/bootstrap/js/tab.js',
    //     './node_modules/bootstrap/js/affix.js'
    // ],
}

gulp.task('bootstrap',function(done){
    
    gulp.src(`${app.src}/fonts/**`)
        .pipe(gulp.dest(`${app.dest}/fonts`));

    
    gulp.src(`${app.src}/less/bootstrap.less`)
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest(`${app.dest}/less`));

   
    gulp.src(`${app.src}/js/**`) // 应该修改为以下面代码的形式，bootstrap颞部
        .pipe(jsmin())
        .pipe(concat('bootstrap.js'))
        .pipe(gulp.dest(`${app.dest}/js`));
    // gulp.task("js", function(done) {
    //     gulp.src(app.js)
    //         .pipe(concat("bootstrap.js"))
    //         .pipe(uglify())
    //         .pipe(rename("bootstrap.min.js"))
    //         .pipe(gulp.dest(`${app.dist}/bootstrap/js`));
    
    //     done();
    // });
    done();
});