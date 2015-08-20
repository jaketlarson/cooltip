var gulp = require('gulp'), 
  sass = require('gulp-ruby-sass') ,
  coffee = require('gulp-coffee'),
  notify = require("gulp-notify") ,
  gutil = require('gulp-util'),
  livereload = require('gulp-livereload');

var config = {
  srcDir: './src/',
  distDir: './dist/',

  sassDir: './src/sass/',
  cssDir: './dist/css/',

  coffeeDir: './src/coffee/',
  jsDir: './dist/js/'
}

gulp.task('coffee', function() {
  gulp.src(config.coffeeDir + '*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.watch(config.coffeeDir))
    .pipe(gulp.dest(config.jsDir));
});


gulp.task('compile-sass', function() {
  gulp.src(config.sassDir + '*.sass')
    .pipe(sass())
    .pipe(gulp.dest(config.cssDir))
    .pipe(notify({ message: 'compile-sass task complete' }));
});

gulp.task('compile-coffee', function() {
  gulp.src(config.coffeeDir +'*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(config.jsDir))
    .pipe(notify({ message: 'compile-coffee task complete' }));
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
   gulp.watch(config.coffeeDir + '*.coffee', ['compile-coffee']); 
   gulp.watch(config.sassDir + '*.sass', ['compile-sass']);
  livereload.listen();
  gulp.watch([config.srcDir + '/**']).on('change', livereload.changed);
});

  gulp.task('default', ['compile-sass', 'compile-coffee', 'watch'], function() {
  gulp.start('compile-coffee', 'compile-sass')

});