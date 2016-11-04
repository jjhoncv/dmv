function Task(gulp) {
	/*
  *  Rutas  
	*/
	var baseDirPug 		= __dirname + "/../source/pug";
	var pathPugDest 	= '../app/modules/views/';
	var pathPugSource = [	baseDirPug + '/*.pug',
												baseDirPug + '/**/*.pug',
												'!' + baseDirPug + '/_**/*.pug',
												'!' + baseDirPug + '/_**/**/*.pug',
												'!' + baseDirPug + '/**/_*.pug']

	/*
  *  npm dependientes
	*/

	var pugNative 				= require("pug"),
			runSequence 			= require("run-sequence"),
			pug 							= require("gulp-pug"),
			pugLint						= require("gulp-pug-lint"),
			plumberNotifier		= require("gulp-plumber-notifier"),
			pugInheritance    = require("pug-inheritance"),
			argv 							= require('yargs').argv,
			browserSync 			= require('browser-sync'),
			rename 						= require("gulp-rename");

	/*
	*  utilitarios de tarea
	*/

	var pugAdapter = function (pug){
    pug.runtime.attr = function (key, val, escaped, terse) {                
        if (key == "__") {
            return ' ' + val;
        }
        if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
            return '';
        }
        if (val === true) {
            return ' ' + (terse ? key : key + '="' + key + '"');
        }
        if (typeof val.toJSON === 'function') {
            val = val.toJSON();
        }
        if (typeof val !== 'string') {
            val = JSON.stringify(val);
            if (!escaped && val.indexOf('"') !== -1) {
                return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
            }
        }
        if (escaped) val = pug.runtime.escape(val);
            return ' ' + key + '="' + val + '"';
    };       
    return pug;
  }

	/*
	*  code
	*/	

	var fn = {
		compiler : function(pathSrc, cb){			
			var pugCustom = pugAdapter(pugNative);
			return gulp.src(pathSrc, { base : baseDirPug })				
				.pipe(plumberNotifier())
				.pipe(pugLint())
				.pipe(pug({
					pretty: argv.production ? false: true,
					basedir: baseDirPug,
					pug: pugCustom
				}))
				.pipe(rename({ extname: ".phtml" }))
				.pipe(gulp.dest(pathPugDest))
				.on("end", function(){
					if (typeof cb === 'function'){
						cb()
					}
				})
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
				path.push(baseDirPug + '/' + file)
			}
		});		
		fn.compiler(path, browserSync.reload);		
	}

	/*
	*  Tasks
	*/

	gulp.task('html:compiler', function(cb){
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