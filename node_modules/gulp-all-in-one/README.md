# gulp-all-in-one
将遵循commonjs规范的所有依赖文件打包进一个文件中的gulp插件

## 安装
```shell
npm install gulp-all-in-one --save-dev
```

## 使用
```javascript
var gulp = require('gulp');
var allInOne = require("gulp-all-in-one");

gulp.task('default',function(){
    gulp.src("src/index.js")
	      .pipe(allInOne("xxx"))
	      .pipe(gulp.dest("dest"));
});
```
