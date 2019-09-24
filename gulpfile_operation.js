let gulp = require('gulp');

let app = {
    src : './src',
    dest : './dest'
}

// html 压缩
let htmlmin = require('gulp-htmlmin');
gulp.task('htmlmin',function(done){
    gulp.src(app.src + '/**/*.{html,htm}')
        .pipe(htmlmin({
            removeComments: true,  // 去除文件注释
            collapseWhitespace: true, // 去除换行空白
            collapseBooleanAttributes: true,  // 去除布尔值属性
        }))
        .pipe(gulp.dest(app.dest));
    done();
});

// css压缩
let cssmin = require('gulp-cssmin');

gulp.task('cssmin',function(done){
    gulp.src(`${app.src}/**/*.css`)
        .pipe(cssmin())
        .pipe(gulp.dest(app.dest));

    done();
});

// js压缩混淆

let jsmin = require('gulp-uglify-es');

gulp.task('jsmin',function(done){
    gulp.src(`${app.src}/**/*.js`)
        .pipe(jsmin.default()) // 调用了gulp-uglify-es 内部的方法
        .pipe(gulp.dest(app.dest));

    done();
});
 
let {default: jsminf} = require('gulp-uglify-es'); // 使用对象解析将函数default复制给jsminf

gulp.task('jsminf',function(done){
    gulp.src(`${app.src}/**/*.js`)
        .pipe(jsminf()) // 本质上调用了gulp-uglify-es内部的default函数
        .pipe(gulp.dest(app.dest));

    done();
});

let rename = require('gulp-rename');

gulp.task('rename',function(done){
    gulp.src(`${app.src}//**`)
        .pipe(rename(function(target,info){
            if(target.extname){
                target.extname += '.bak';
            }
        }))
        .pipe(gulp.dest('./bak')); // 对所有文件加上扩展名

    done();
});


let concat = require('gulp-concat');  // concat用于将多个相同文件整合在一起
gulp.task('concat',function(done){
    gulp.src(`${app.src}/**/*.css`) // 将多个css文件整合在一起
        .pipe(concat('all.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(app.dest)); 

    done();
});

// less编译
// npm i gulp-less -D

let less = require("gulp-less");

// 将src/less/*.less编译到dest/css/*.css
gulp.task("less1", function(done) {
    gulp.src(`${app.src}/less/*.less`)
        .pipe(less())
        .pipe(gulp.dest(app.dest + "/css"));

    done();
});

// 将src/less/*.less编译到dest/css/all.css
gulp.task("less2", function(done) {
    gulp.src(`${app.src}/less/*.less`)
        .pipe(less())
        .pipe(concat("all.css"))
        .pipe(gulp.dest(app.dest + "/css"));

    done();
});

// 将src/less/*.less编译并压缩到dest/css/all.min.css
gulp.task("less3", function(done) {
    gulp.src(`${app.src}/less/*.less`)
        .pipe(less())
        .pipe(concat("all.css"))
        .pipe(cssmin())
        .pipe(rename("all.min.css"))
        .pipe(gulp.dest(app.dest + "/css"));

    done();
});