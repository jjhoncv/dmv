'use strict';

var gulp 					= require('gulp'),
		runSequence 	= require("run-sequence")

var runTask = function (nameTask){
  var Task = require("./tasks/" + nameTask + "/main");
  return new Task(gulp);
};

var taskHTML = runTask("gulp-html");
taskHTML.run();

runTask("gulp-bower");

/*runTask("gulp-watch").run({
  //js    : taskJS.watcher,
  html  : taskHTML.watcher
});*/


gulp.task('default', function (cb) {
    runSequence('html','bower', cb);
});