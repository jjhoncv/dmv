function Task(gulp) {
	/*
  *  Rutas  
	*/
	var baseDirPug 		= __dirname + "/../../source/pug";
	var pathPugDest 	= '../app/modules/';
	var pathPugSource = [	baseDirPug + '/*.pug',
												baseDirPug + '/**/*.pug',
												'!' + baseDirPug + '/_**/*.pug',
												'!' + baseDirPug + '/_**/**/*.pug',
												'!' + baseDirPug + '/**/_*.pug']

	/*
  *  npm dependientes
	*/

	var pugNative 				= require("pug"),
			runSequence 			= require("run-sequence")
			gPug 							= require("gulp-pug"),
			gPugLint					= require("gulp-pug-lint"),
			gPlumberNotifier	= require("gulp-plumber-notifier"),
			pugInheritance    = require("pug-inheritance"),
			gRename 					= require("gulp-rename");

	/*
	*  utilitarios de tarea
	*/

	var utils  	= require('./utils');

	/*
	*  code
	*/	

	var fn = {
		compiler : function(pathSrc){
			var pugCustom = utils.pugAdapter(pugNative);
			return gulp.src(pathSrc, { base : baseDirPug })				
				.pipe(gPlumberNotifier())
				.pipe(gPugLint())
				.pipe(gPug({
					pretty: true,
					basedir: baseDirPug,
					pug: pugCustom
				}))
				.pipe(gRename({ extname: ".phtml" }))
				.pipe(gulp.dest(pathPugDest))				
		}
	}

	var watcher = function(chunk){
		var options = { basedir: baseDirPug + "/", extension: '.pug', skip: 'node_modules'};
		var inheritance = new pugInheritance(chunk.path, options.basedir, options);
		var inheritanceFiles = inheritance.files;

		//Agrego basePath a los archivos y filtro los archivos _*.pug        
		var path = [];		
		inheritanceFiles.forEach(function(file) {
			if (!/^_.+$/g.test(file)) {
				path.push(jadeflux + '/' + file)
			}
		});
		
		fn.compiler(path);
		//plugins.browserSync.reload;
	}

	/*
	*  Tasks
	*/

	gulp.task('html:compiler', function(){
		return fn.compiler(pathPugSource); 
	});

	var runTasks = function(){
		gulp.task('html', function(cb) {
		  return runSequence('html:compiler', cb);         
		});
	}

	return {
    run : runTasks,
    watcher: watcher
	}
}

module.exports = Task;