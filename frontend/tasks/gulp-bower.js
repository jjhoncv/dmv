function Task(gulp) {
	
	var dockerPathOutputLibsSource = "../public/static/libs/source",  
      dockerPathOutputLibsDist   = "../public/static/libs/dist",  
      runSequence                = require("run-sequence"),
  		bower 			               = require("gulp-bower"),
      uglify                     = require("gulp-uglify"),
      gulpif                     = require("gulp-if"),
      argv                       = require('yargs').argv,
      uglifycss                  = require('gulp-uglifycss'),     
      preen                      = require("preen"),
      rename                     = require("gulp-rename");


  gulp.task('bower:install', function(cb) {
      return bower({
          cmd: "update",
          directory: dockerPathOutputLibsSource
      })
  });

  gulp.task("bower:filter", function(cb) {
      return preen.preen({
          directory: dockerPathOutputLibsSource
      }, cb);
  });

  gulp.task("bower:dist", function(cb) {      
      return gulp.src(dockerPathOutputLibsSource+ "/**")
        .pipe(gulpif("*.js", gulpif(argv.production, uglify())))
        .pipe(gulpif("*.css", gulpif(argv.production, uglifycss({ "maxLineLen": 80, "uglyComments": true }))))
        .pipe(gulp.dest(dockerPathOutputLibsDist));
  });

  gulp.task("bower", function(cb){
    runSequence("bower:install", "bower:filter", "bower:dist", cb)
  });

}

module.exports = Task;