function Task(gulp) {
	
	var baseDirSource         = __dirname + "/../source/static",
      baseDirStylus         = baseDirSource + "/../stylus",
      dockerPathInputFonts  = baseDirSource + "/fonts",
      pathStylusDest        = '../public/static/css/dist';

  /*
  *  npm dependientes
  */      

  var consolidate     = require("gulp-consolidate"),
      plumberNotifier = require("gulp-plumber-notifier"),
      stylus          = require('gulp-stylus'),
      runSequence     = require("run-sequence"),
      argv            = require('yargs').argv,
      uglifycss       = require('gulp-uglifycss'),
      gulpif          = require("gulp-if"),   
	    fs              = require("fs");

  gulp.task("fonts:compile", function(cb){
    var dirList = []
    fs.readdirSync(dockerPathInputFonts + "/").forEach(function(file){
      if(/^[^_]*-webfont$/g.test(file)){
      dirList.push(file)
      }
    });

    return gulp.src(dockerPathInputFonts + "/_template/fonts.styl")     
      .pipe(consolidate("lodash", { dirList: dirList }))
      .pipe(gulp.dest(baseDirStylus + "/_config"))      
  });

  gulp.task("fonts:css", function(cb){    
    return gulp.src(baseDirStylus + "/_config/fonts.styl")      
      .pipe(plumberNotifier())
      .pipe(stylus())
      .pipe(gulpif(argv.production, uglifycss({ "maxLineLen": 0, "uglyComments": true })))
      .pipe(gulp.dest(pathStylusDest));
  });


  gulp.task('fonts', function(cb) {
    return runSequence('fonts:compile', 'fonts:css', 'copy:fonts', cb);         
  });
}

module.exports = Task;