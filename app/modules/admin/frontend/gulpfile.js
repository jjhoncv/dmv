var gulp 				= require('gulp');
var pug 				= require('gulp-pug');
var rename 			= require("gulp-rename");
var runSequence = require('run-sequence');

var clean 			= require('gulp-clean');

var dirBasePug 	= __dirname + "/source/views";
var dest 				= "../";

gulp.task("clean:views", function(){
	return gulp.src(dest + "/views/*.phtml")
		.pipe(clean({force:true}))
})

gulp.task('views', ['clean:views'], function buildHTML() {
  return gulp.src([dirBasePug + "/*.pug", "!" + dirBasePug + "/_*.pug"])
  .pipe(pug({
    basedir : dirBasePug,
    pretty: true
  }))
  .pipe(rename({extname: ".phtml"}))
  .pipe(gulp.dest(dest + "/views"))
});

gulp.task('default', function(cb){
	runSequence("views", cb)
});

gulp.task('watch', function () {
	gulp.watch([dirBasePug + "/*.pug"], ['views']);
})