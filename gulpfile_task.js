// 该文件的文件名不能更改，因为在使用gulp自动化执行时，不需要指定文件名gulp默认执行文件名为gulpfile.js的文件

let gulp = require('gulp'); // 引入gulp工具

gulp.task('hello',function(done){ // gulp.task('名称',回调函数)
    console.log('hello');
    done(); // 向gulp工具表明任务已经完成
});

gulp.task('hi',function(done){ // gulp.task('名称',回调函数)
    console.log('hi');
    done(); // 向gulp工具表明任务已经完成
});

// 执行多个任务

gulp.task('jobs',gulp.series('hello','hi')); // 按照series()中的指定的顺序执行，任务名为jobs
