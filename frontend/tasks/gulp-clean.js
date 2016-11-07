function Task(gulp) {
	
	dockerPathOutputStatic = "../public/static"

  dockerPathOutputImg   = dockerPathOutputStatic + "/img"
  dockerPathOutputFonts = dockerPathOutputStatic + "/fonts"
  dockerPathOutputJs    = dockerPathOutputStatic + "/js"
  dockerPathOutputCss   = dockerPathOutputStatic + "/css" 
  baseDirStylusConfig   =  __dirname + "/../source/stylus/_config";

  
  var del         = require("del");

  gulp.task("clean", function (cb) {
    return del([
      dockerPathOutputImg,
      dockerPathOutputFonts,
      dockerPathOutputJs,
      dockerPathOutputCss,
      baseDirStylusConfig + "/fonts.styl",
      baseDirStylusConfig + "/icons.styl",
      baseDirStylusConfig + "/*_sprite.styl",
      dockerPathOutputStatic + "/libs/dist"
    ], { force: true }, cb);
  });

}

module.exports = Task;