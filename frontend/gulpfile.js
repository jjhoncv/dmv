'use strict';

var gulp 					= require('gulp'),
		runSequence 	= require("run-sequence")

var runTask = function (nameTask){
  var Task = require("./tasks/" + nameTask);
  return new Task(gulp);
};

var taskHTML = runTask("gulp-html");
taskHTML.run();

var taskCSS = runTask("gulp-css");
taskCSS.run();

var taskJS = runTask("gulp-js");
taskJS.run();

runTask("gulp-bower");
runTask("gulp-clean");
runTask("gulp-fonts");

runTask("gulp-watch").run({  
  html  : taskHTML.watcher,
  css   : taskCSS.watcher
});

gulp.task('default', ['clean'], function (cb) {
  runSequence('html', 'fonts', cb);
});