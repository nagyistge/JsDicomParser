var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var watchplugin = require('gulp-watch');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var del = require('del');
var concat = require('gulp-concat');
var config = require('./gulpfile.config');

function buildTypescript(src, dest) {
    var tsResult = gulp.src(src)
                       .pipe(sourcemaps.init())
                       .pipe(tsc({
                           target: 'ES5',                           
                           out: dest,
                           declarationFiles: false,
                           noExternalResolve: true
                       }));

        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.build.js));
}

gulp.task('dicomImaging:build', function () {
    return buildTypescript(config.src.dicomImagingTs, config.build.dicomImagingJsFile);
});

gulp.task('dicomParserTs:build', function () {
    return buildTypescript(config.src.dicomParserTs, config.build.dicomParserJsFile);
});

gulp.task('ts:build', [
    'dicomParserTs:build',
    'dicomImaging:build',
]);

gulp.task('watch', function(){
    watchplugin([config.watch.ts], function(){
        gulp.start('ts:build');
    });    
});

gulp.task('build', [
    'ts:build'
]);

gulp.task('clean', function(cb){
    rimraf(config.clean, cb);    
});

gulp.task('default', function() {
    return runSequence('build', 'watch');
});