function Task(gulp) {
	
	dockerPathOutputJs = "../public/static/libs/source"
  
  var runSequence = require("run-sequence"),
  		bower 			= require("gulp-bower"),
  		preen				= require("preen");


  gulp.task('bower:install', function(cb) {
      return bower({
          cmd: "update",
          directory: dockerPathOutputJs
      })
  });

  gulp.task("bower:filter", function(cb) {
      return preen.preen({
          directory: dockerPathOutputJs
      }, cb);
  });

  gulp.task("bower", function(cb){
    runSequence("bower:install", "bower:filter", cb)
  });

}

module.exports = Task;