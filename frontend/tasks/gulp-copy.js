function Task(gulp) {
	/*
  *  Rutas  
	*/

	var baseDirSource         = __dirname + "/../source/static",
      baseDirStylus         = baseDirSource + "/../stylus",
      dockerPathInputFonts  = baseDirSource + "/fonts",
      dockerPathInputImgs  	= baseDirSource + "/img",
      dockerPathInputLibs  	= baseDirSource + "/libs",
      pathStaticDest        = '../public/static';


	var pathCopyFontsFiles = [
	  dockerPathInputFonts + "/**/*.*",
	  "!" + dockerPathInputFonts + "/_**/*.*"
	]

	var pathCopyImgFiles = [
	  dockerPathInputImgs + "/**/**/*.*",
	  "!" + dockerPathInputImgs + "/_**/**/*.*",
	  "!" + dockerPathInputImgs + "/**/_**/*.*",
	  "!" + dockerPathInputImgs + "/**/**/_*.*"
	]

	/**
   *  npm dependientes
	 */

	var gulpif        = require("gulp-if"),
			gzip        	= require("gulp-gzip"),	
			runSequence 	= require("run-sequence"),
			uglify      	= require("gulp-uglify"),
			argv 					= require('yargs').argv,
			uglifycss     = require('gulp-uglifycss'),
			imagemin    	= require("gulp-imagemin"),
	    imageminPNG 	= require("imagemin-optipng"),
	    imageminJPG 	= require("imagemin-jpegtran"),
	    imageminSVG 	= require("imagemin-svgo");

	/**
	 * Tarea para copiar fuentes
	 * (gulp copy:fonts)
	 */

	gulp.task("copy:fonts", function() {
	  return gulp.src(pathCopyFontsFiles)
	  .pipe(gulpif(argv.gzip, gzip({ append: false  })))
	  .pipe(gulp.dest(pathStaticDest + "/fonts"));
	});


	/**
	* Tarea para copiar imagenes
	* (gulp copy:img)
	*/

	gulp.task("copy:img", function() {
	  return gulp.src(pathCopyImgFiles)
	  .pipe(gulpif(argv.production, imagemin({
	    verbose: true,
	    plugins: [
		    imageminPNG({optimizationLevel: 3}),
		    imageminJPG({progressive: true}),
		    imageminSVG()
	    ]
	  })))
	  .pipe(gulpif(argv.gzip, gzip({ append: false  })))
	  .pipe(gulp.dest(pathStaticDest + "/img"));
	});

	/**
 * Tarea para copiar librerías javascript con extensión *.js
 * (gulp copy:js:libs)
 *
 * Hay casos donde las librerías que no están registradas en bower, se deben copian al proyecto no minificadas
 * en frontend/static/libs/ 
 */
gulp.task("copy:libs", function () {
  return gulp.src(dockerPathInputLibs + "/**")
  .pipe(gulpif("*.js", gulpif(argv.production, uglify())))
  .pipe(gulpif("*.css", gulpif(argv.production, uglifycss({ "maxLineLen": 80, "uglyComments": true }))))
  .pipe(gulp.dest(pathStaticDest + "/libs"));
});


	/**
	 * Tarea principal
	 */
	gulp.task("copy", function (cb) {
	  runSequence("copy:fonts", "copy:libs", "copy:img", cb)
	});


}

module.exports = Task;