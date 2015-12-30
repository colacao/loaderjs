var gulp = require('gulp');
var allInOne = require("./index");
var path = require("path");
var fs = require("fs");
var stylus = require("gulp-stylus");

gulp.task('default',function(){
    gulp.src("test/src/index.js")
	    .pipe(allInOne("xxx", function(filepath, callback){
	    	var ext = path.extname(filepath);
	    	switch(ext){
	    		case ".styl":
	    			gulp.src(filepath)
	    				.pipe(stylus())
	    				.pipe(callback({
	    					type: "style"
	    				}));
	    			break;
	    		case ".tpl":
	    			gulp.src(filepath)
	    				.pipe(callback({
	    					type: "text"
	    				}));
	    			break;
	    		default:
	    			gulp.src(filepath)
	    				.pipe(callback());
	    	}
	    }))
		//.pipe(allInOne("xxx"))
	    .pipe(gulp.dest("test/dist"));
});