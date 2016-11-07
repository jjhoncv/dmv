function Task(gulp) {
	/*
  *  Rutas  
  */
  var baseDirStatic     = __dirname + "/../source/static";
  var baseDirStylus     = __dirname + "/../source/stylus";  
  var pathStaticDest    = '../public/static';  

  /*
  *  npm dependientes
  */

  var stylus          = require('gulp-stylus'),
      spritesmith     = require("gulp.spritesmith"),      
      runSequence     = require("run-sequence"),      
      argv            = require('yargs').argv,
      uglifycss       = require('gulp-uglifycss'),
      gulpif          = require("gulp-if"),
      merge           = require('merge-stream'),
      plumberNotifier = require("gulp-plumber-notifier");


  /**
   * Tarea para compilar sprites
   * (gulp sprites:compile)
   */
  gulp.task("sprites:compile", function () {
    var spriteData = gulp.src(baseDirStatic + "/img/_sprites/main_sprite/*.png")
      .pipe(spritesmith({
        algorithm: "binary-tree",
        imgPath  : "../../img/main_sprite.png",
        imgName  : "main_sprite.png",
        cssName  : "main_sprite.styl"
      }));
    var imgStream = spriteData.img.pipe(gulp.dest(pathStaticDest + "/img"));
    var cssStream = spriteData.css.pipe(gulp.dest(baseDirStylus + "/_config"));
    return merge(imgStream, cssStream);
  });
  
  gulp.task('sprites', function(cb) {
    return runSequence('sprites:compile', cb);         
  });

}

module.exports = Task;