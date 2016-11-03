function Task(gulp) {
	/*
  *  Rutas  
	*/
	var baseDirStylus			= __dirname + "/../../source/stylus";
	var pathStylusDest 		= '../public/static/css/';
	var pathStylusSource 	= [	baseDirStylus + '/*.styl',
														baseDirStylus + '/**/*.styl',
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
			plumberNotifier	= require("gulp-plumber-notifier");


	/*
	*  code
	*/	

	var fn = {
		compiler : function(pathSrc){
			return gulp.src(pathSrc)
				.pipe(plumberNotifier())
				.pipe(stylus({use:[jeet(),rupture(),nib()]}))
				.pipe(gulp.dest(pathStylusDest));
		}
	}

	var watcher = function(chunk){		
		fn.compiler(baseDirStylus + '/' + chunk.path);
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