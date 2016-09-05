var gulp = require('gulp');
var sass = require('gulp-sass');
var gconcat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('styles', function(){
	gulp.src('scss/style.scss')
	.pipe(sass({includePaths: ['./scss']}).on('error', sass.logError))
	.pipe(gulp.dest('css'));

});

gulp.task('default',function() {
    gulp.watch('scss/*.scss',['styles']);
});
gulp.task('minify', function(){
	gulp.src(['angular/angular.js','angular/angular-ui-router.js', 'angular/angular-touch.js',
		'angular/angular-animate.js', 'angular/angular-jwt.js', 'angular/angular-storage.js',
		'angular/ui-bootstrap-tpls-2.0.0.min.js','angular/Chart.min.js', 'angular/angular-chart.min.js'])
	.pipe(gconcat('angular.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist'));
}) 
// gulp.task('minify', function(){
// 	gulp.src(['angular/angular.js', 'angular/angular-ui-router.js', 'angular/angular-touch.js',
// 	 'angular/angular-animate.js', 'angular/angular-jwt.js', 'angular/angular-storage.js',
// 	 'angular/ui-bootstrap-tpls-2.0.0.min.js','angular/Chart.min.js', 'angular/angular-chart.min.js',
// 	 'js/app.js', 'js/directives/directives.js',
// 	 'js/controllers/*.js', 'js/routes.js', 'js/services/*.js'])
// 	.pipe(gconcat('ankieta.min.js'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('./dist'));
// }) 

