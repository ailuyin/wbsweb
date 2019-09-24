// 该文件的文件名不能更改，因为在使用gulp自动化执行时，不需要指定文件名gulp默认执行文件名为gulpfile.js的文件

let gulp = require('gulp'); // 引入gulp工具

let app  = {
    src:'./src',
    dest:'./dest'
}

gulp.task('copy1',function(done){
    // gulp.src(app.src)
        // .pipe(gulp.dest(app.dest)); // 只是将目录复制到了指定文件夹的下面
    // gulp.src(app.src)
    //     .pipe(gulp.dest(app.dest + '/*')); // 只会复制一级子目录（src目录没有创建）
    // gulp.src(app.src)
    //     .pipe(gulp.dest(app.dest + '/**'));  // 能复制所有的文件（目录不会生成） 

    // 完整的拷贝，分两步进行
    gulp.src(app.src)
        .pipe(gulp.dest(app.dest)); // 创建src文件夹
    gulp.src(app.src + '/**') // 将src文件下所有的文件传到新建的src目录下
        .pipe(gulp.dest(app.dest + '/src' ));
    done();
});


// 实现选择拷贝

gulp.task('copy2',function(done){
    gulp.src(app.src + '/js')
        .pipe(gulp.dest(app.dest));
    gulp.src(app.src + '/css')
        .pipe(gulp.dest(app.dest)); // 创建js和css文件夹

    gulp.src(app.src + '/js/**')
        .pipe(gulp.dest(app.dest + '/js'));
    gulp.src(app.src + '/css/**')
        .pipe(gulp.dest(app.dest + '/css')); // 将文件复制到js和css文件夹下
    done();
});
//  []表示想要复制的文件组合，！表示剔除不需要的东西

gulp.task('copy3',function(done){
    gulp.src([`${app.src}/*`,`!${app.src}/js`,`!${app.src}/css`])
        .pipe(gulp.dest(app.dest));
    done();
});

// 只要导出项目中的所有页面
// 方法一：
gulp.task("copy4", function(done) {
    gulp.src([`${app.src}/**/*.html`, `${app.src}/**/*.htm`])
        .pipe(gulp.dest(app.dest));

    done();
});

// 方法二：
// 枚举{}：指定的几个值
gulp.task("copy4", function(done) {
    gulp.src(`${app.src}/**/*.{htm,html}`)
        .pipe(gulp.dest(app.dest));

    done();
});

// 实现删除功能

// npm i gulp-clean --save-dev

// 导入第三方组件
let clean = require("gulp-clean");

// 删除内容（保留目录）
gulp.task("clean1", function(done) {
    gulp.src(app.dest + "/*")       // 这里不要使用/**（仅在copy子目录内容时使用）
        .pipe(clean());

    done();
});

// 删除目录
gulp.task("clean2", function(done) {
    gulp.src(app.dest)
        .pipe(clean());

    done();
});

// 选择删除
gulp.task("clean3", function(done) {
    // gulp.src([`${app.dest}/**/*.html`, `${app.dest}/**/*.htm`])
    gulp.src(`${app.dest}/**/*.{htm,html}`)
        .pipe(clean());

    done();
});

