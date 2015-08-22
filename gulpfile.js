var gulp = require('gulp'), 
  sass = require('gulp-ruby-sass') ,
  coffee = require('gulp-coffee'),
  notify = require("gulp-notify") ,
  gutil = require('gulp-util'),
  livereload = require('gulp-livereload');
  header = require('gulp-header');

var config = {
  srcDir: './src/',
  distDir: './dist/',

  sassDir: './src/sass/',
  cssDir: './dist/css/',

  coffeeDir: './src/coffee/',
  jsDir: './dist/js/'
}

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * v<%= pkg.version %>',
  ' * Docs: <%= pkg.homepage %>',
  ' *',
  '<%= pkg.license.join("\\n") %>',
  '*/',
  ''].join('\n');


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
  gulp.src(config.coffeeDir + '*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(config.jsDir))
    .pipe(notify({ message: 'compile-coffee task complete' }));
});

gulp.task('append-cooltip-license', function () {
  gulp.src(config.jsDir + 'cooltip.js')
    .pipe(header(banner, { pkg : pkg }))
    .pipe(gulp.dest(config.jsDir));
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
   gulp.watch(config.coffeeDir + '*.coffee', ['compile-coffee']); 
   gulp.watch(config.sassDir + '*.sass', ['compile-sass']);
  livereload.listen();
  gulp.watch([config.srcDir + '/**']).on('change', livereload.changed);
   gulp.watch(config.jsDir + '*.js', ['append-cooltip-license']);
});


  gulp.task('default', ['compile-sass', 'compile-coffee', 'watch'], function() {
  gulp.start('compile-coffee', 'compile-sass')

});