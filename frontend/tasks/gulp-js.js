/*
falta hacer el clean de source/scripts
*/

function Task(gulp) {
  /*
  *  Rutas  
  */
  var baseDirEs6        = __dirname + "/../source/es6";
  var pathEs6Dest       = '../public/static/js/source';
  var pathEs6ConcatJS   = '../public/static/js/dist';
  var pathEs6Source     = [ baseDirEs6 + '/*.es6',
                            baseDirEs6 + '/**/*.es6',
                            '!' + baseDirEs6 + '/_**/*.es6',                        
                            '!' + baseDirEs6 + '/**/_*.es6']

  /*
  *  npm dependientes
  */

  var runSequence       = require("run-sequence"),
      concat            = require("gulp-concat"),
      jshint            = require("gulp-jshint"),
      plumberNotifier   = require("gulp-plumber-notifier"),
      uglify            = require("gulp-uglify"),
      argv              = require('yargs').argv,
      browserSync       = require('browser-sync'),
      babel             = require('gulp-babel'),
      recursiveConcat   = require('gulp-recursive-concat'),
      //xo                = require('gulp-xo'),
      gulpif            = require("gulp-if"),
      rename            = require("gulp-rename");

  /*
  *  code
  */  

  var fn = {
    compiler: function(pathSrc, cb){           
      return gulp.src(pathSrc, { base : baseDirEs6 })       
        .pipe(plumberNotifier())
        //.pipe(xo())
        .pipe(babel({presets: ['es2015']}))        
        .pipe(gulp.dest(pathEs6Dest))
        .on("end", function(){
          if (typeof cb === 'function'){
            cb()
          }
        })
    },
    concat: function(cb){
      return gulp.src(pathEs6Dest + '/**/*.js')
      .pipe(recursiveConcat({extname: ".js", outside: true}))
      .pipe(gulpif(argv.production, uglify()))
      .pipe(gulp.dest(pathEs6ConcatJS))
      .on("end", function(){
        if (typeof cb === 'function'){
          cb()
        }
      })
    },
    jshint: function(pathSrc, cb){
      return gulp.src(pathSrc)      
      .pipe(jshint({
        esversion: 6
      }))
      .pipe(plumberNotifier())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'))
      .on("data", function(){
        if (typeof cb === 'function'){
          cb()
        }
      })
    }
  }

  var watcher = function(chunk){
    fn.jshint(chunk.path, function(){
      fn.compiler(chunk.path, function(){
        fn.concat(browserSync.reload)        
      });       
    });
  }

  /*
  *  Tasks
  */

  gulp.task('js:concat', function(cb){
    return fn.concat(); 
  });

  gulp.task('js:hint', function(cb){
    return fn.jshint(pathEs6Source); 
  });


  gulp.task('es6:compiler', function(cb){
    return fn.compiler(pathEs6Source); 
  });

  var runTasks = function(){
    gulp.task('js', ["clean:js"], function(cb) {
      return runSequence('js:hint','es6:compiler', 'js:concat', cb);         
    });
  }

  return {
    run : runTasks,
    watcher: watcher
  }
}

module.exports = Task;