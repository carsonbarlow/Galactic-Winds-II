var gulp = require('gulp');
var concat = require('gulp-concat-util');
var uglify = require('gulp-uglify');

// var config = {
//   files: [
//     // 'src/index_head.html',
//     'src/*.js'
//     // 'src/index_foot.html'
//   ]
// }

gulp.task('default', function() {
  // place code for your default task here
  console.log('doing stuff');
});


gulp.task('test', function(done){
  console.log( 'But I did\'t do anything!' );
  done();
});

gulp.task('build', function(){
  var js = gulp.src('src/*.js')
  .pipe(concat('script.js'))
  .pipe(concat.header('(function(){\n'))
  .pipe(concat.footer('\n})();\n'))
  .pipe(uglify())
  .pipe(gulp.dest('build/'));
});