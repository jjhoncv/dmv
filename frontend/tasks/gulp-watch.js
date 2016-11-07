function Task(gulp) {
	
	var runTasks = function (objWatchers) {

		var browserSync = require('browser-sync'),
				connect = require('gulp-connect-php'),
				reload = browserSync.reload;


		gulp.task('watch', function() {
			connect.server({
				base : "../public",
				port : 8081
			}, function (){
				browserSync({
					proxy 	: 'local.dmv.com',
					browser : "google-chrome"
		      //browser : "firefox"
				});
			});
			
			gulp.watch(['source/es6/*.es6','source/es6/**/*.es6','source/es6/**/**/*.es6'], objWatchers.js);
			gulp.watch('source/pug/*.pug', objWatchers.html);
			gulp.watch("source/stylus/*.styl", objWatchers.css);
			gulp.watch('../**/*.php', browserSync.reload);	
		});

	}
	
	return {
    run : runTasks
  }
	
}

module.exports = Task;