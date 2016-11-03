'use strict';

var gulp 					= require('gulp'),
		runSequence 	= require("run-sequence")

var runTask = function (nameTask){
  var Task = require("./tasks/" + nameTask + "/main");
  return new Task(gulp);
};

var taskHTML = runTask("gulp-html");
taskHTML.run();

var taskCSS = runTask("gulp-css");
taskCSS.run();

runTask("gulp-bower");

runTask("gulp-watch").run({  
  html  : taskHTML.watcher,
  css   : taskCSS.watcher
});

gulp.task('default', function (cb) {
    runSequence('html','bower', 'css', cb);
});