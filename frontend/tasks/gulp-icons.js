function Task(gulp) {
  
  /*
  *  Rutas  
  */

  var baseDirSource         = __dirname + "/../source/static",
      baseDirStylus         = baseDirSource + "/../stylus",  
      dockerPathInputIcons  = baseDirSource + "/icons",      
      pathStaticDest        = '../public/static';


  /**
   *  npm dependientes
   */

  var iconfont        = require("gulp-iconfont"),
      runSequence     = require("run-sequence"),
      stylus          = require('gulp-stylus'),
      uglifycss       = require('gulp-uglifycss'),
      argv            = require('yargs').argv,
      gulpif          = require("gulp-if"),
      plumberNotifier = require("gulp-plumber-notifier"),
      consolidate     = require("gulp-consolidate");  

  /**
   * Tarea para compilar iconos .svg
   * (gulp icons:compile)
   *
   * Genera un archivo .styl y archivos de fuentes .eot .svg .ttf .woff
   */
  gulp.task("icons:compile", function(){
    return gulp.src(dockerPathInputIcons + "/*.svg")
      .pipe(iconfont({
        normalize     : true,
        prependUnicode: true,
        fontName      : "icons-webfont",
        formats       : ["ttf", "eot", "woff", "svg"],
        timestamp     : Math.round(Date.now()/1000)
      }))
      .on("glyphs", function(codepoints, options) {
        gulp.src(dockerPathInputIcons + "/_template/icons.styl") //Template
          .pipe(consolidate("lodash", {
            glyphs  : codepoints,
            fontName: "icons-webfont"
          }))
          .pipe(gulp.dest(baseDirStylus + "/_config"));
      })
      .pipe(gulp.dest(pathStaticDest + "/fonts/icons-webfont"));
  });

  /**
  * Tarea para compilar solo css de icons
  *
  */
  gulp.task("icons:css", function(){
    return gulp.src(baseDirStylus + "/_config/icons.styl")
      .pipe(plumberNotifier())
      .pipe(stylus())
      .pipe(gulpif(argv.production, uglifycss({ "maxLineLen": 80, "uglyComments": true })))
      .pipe(gulp.dest(pathStaticDest + "/css/dist")); 
  });

  gulp.task('icons', function(cb) {
    return runSequence('icons:compile', 'icons:css', cb);         
  });

}

module.exports = Task;