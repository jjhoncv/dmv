function Task(gulp) {
	
	pathDestStatic = "../public/static"

  dockerPathOutputImg   = pathDestStatic + "/img"
  dockerPathOutputFonts = pathDestStatic + "/fonts"
  dockerPathOutputJs    = pathDestStatic + "/js"
  dockerPathOutputCss   = pathDestStatic + "/css" 
  baseDirStylusConfig   =  __dirname + "/../source/stylus/_config";


  var pathEs6DestScripts = pathDestStatic + '/js/**/scripts';
  
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
      pathDestStatic + "/libs/dist"
    ], { force: true }, cb);
  });

  gulp.task("clean:js", function(cb){
    return del([pathEs6DestScripts], { force: true}, cb);
  })

}

module.exports = Task;
