function Task(gulp) {
	/*
  *  Rutas  
	*/
	var baseDirStylus			= __dirname + "/../source/stylus";
	var pathStylusDest 		= '../public/static/css/dist';
	var pathStylusSource 	= [	baseDirStylus + '/*.styl',
														baseDirStylus + '/**/*.styl',
														'!' + baseDirStylus + '/_.styl',
														'!' + baseDirStylus + '/fonts.styl',
														'!' + baseDirStylus + '/_**/*.styl',
														'!' + baseDirStylus + '/_**/**/*.styl',
														'!' + baseDirStylus + '/**/_*.styl']

	/*
  *  npm dependientes
	*/

	var stylus 					= require('gulp-stylus'),
			rupture 				= require('rupture'),
			jeet 						= require('jeet'),
			runSequence 		= require("run-sequence"),
			nib 						= require('nib'),
			argv 						= require('yargs').argv,
			uglifycss       = require('gulp-uglifycss'),
			browserSync 		= require('browser-sync'),
			gulpif          = require("gulp-if"),   
			plumberNotifier	= require("gulp-plumber-notifier");


	/*
	*  code
	*/	

	var fn = {
		compiler : function(pathSrc, cb){
			return gulp.src(pathSrc)				
				.pipe(plumberNotifier())
				.pipe(stylus({use:[jeet(),rupture(),nib()]}))
				.pipe(gulpif(argv.production, uglifycss({ "maxLineLen": 80, "uglyComments": true })))
				.pipe(gulp.dest(pathStylusDest))
				.on("end", function(){
					if (typeof cb === 'function'){
						cb()
					}
				});
		}
	}

	var watcher = function(chunk){		
		fn.compiler(chunk.path, browserSync.reload);	
	}

	/*
	*  Tasks
	*/

	gulp.task('css:compiler', function(){
		return fn.compiler(pathStylusSource); 
	});

	var runTasks = function(){
		gulp.task('css', function(cb) {
		  return runSequence('css:compiler', cb);         
		});
	}

	return {
    run : runTasks,
    watcher: watcher
	}
}

module.exports = Task;