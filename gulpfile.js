var gulp = require("gulp"),
  livereload = require("gulp-livereload"),
  cssminify = require("gulp-minify-css"),
  htmlmini = require("gulp-htmlmin"),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
  zip = require('gulp-zip'),
  tcloader = require("gulp-tcloader");

var config = require("./config.json");

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['*.*']).on('change', livereload.changed);
});
gulp.task('default', function() {
  gulp.run(['js','css','html','img']);
})
gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(tcloader("m"))
    .pipe(gulp.dest('dest/js'));
});
gulp.task('img', function() {
  gulp.src('images/*.*')
    .pipe(cache(imagemin({
      use: [pngquant()],
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    })))
    .pipe(gulp.dest('dest/images'));
  gulp.src('images/*.*')
    .pipe(webp())
    .pipe(gulp.dest('dest/images'));
});
gulp.task('css', function() {
  gulp.src('css/*.css')
    .pipe(cssminify())
     .pipe(tcloader("s"))
    .pipe(gulp.dest('dest/css'));
});
gulp.task('html', function() {
  gulp.src('temp/*.html')
    .pipe(htmlmini())
    .pipe(tcloader("t"))
    .pipe(rename({
      extname: '.html.js'
    }))
    .pipe(gulp.dest('dest/temp'));
});
gulp.task('zip', function() {
  gulp.src(["dest/**","package.json","index.html"])
    .pipe(zip('upload'+config.version+".zip"))
    .pipe(gulp.dest('dist'));
});