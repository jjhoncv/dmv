function Task(gulp) {
	
	dockerPathOutputStatic = "../public/static"

  dockerPathOutputImg   = dockerPathOutputStatic + "/img"
  dockerPathOutputFonts = dockerPathOutputStatic + "/fonts"
  dockerPathOutputJs    = dockerPathOutputStatic + "/js"
  dockerPathOutputCss   = dockerPathOutputStatic + "/css"  
  
  var del         = require("del");

  gulp.task("clean", function (cb) {
    return del([
      dockerPathOutputImg,
      dockerPathOutputFonts,
      dockerPathOutputJs,
      dockerPathOutputCss
    ], { force: true }, cb);
  });

}

module.exports = Task;