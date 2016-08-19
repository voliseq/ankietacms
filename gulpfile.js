var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function(){
	gulp.src('scss/style.scss')
	.pipe(sass({includePaths: ['./scss']}).on('error', sass.logError))
	.pipe(gulp.dest('css'));

});

gulp.task('default',function() {
    gulp.watch('scss/*.scss',['styles']);
}); 