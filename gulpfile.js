/**
* To install a module as a development dependency (example of browserify):
* npm install --save-dev browserify
*/

//tasks variables ..............................................................
var gulp 		= require('gulp'), 
	gutil 		= require('gulp-util'), 
	connect 	= require('gulp-connect'), 
	compass 	= require('gulp-compass');

 
//processed files destination depends on the environment ........................
 

//sources variable ..............................................................
var sources = { 
	'sass' 		: ['components/sass/**/*.scss'],
	'html' 		: ['builds/development/*.html']
};


//destinations variable .........................................................
var destinations = {  
	'css'		: 'builds/development/css'		 
};  

//compass task ..................................................................
gulp.task('compass', function(){ 
	gulp.src(sources['sass'])
		.pipe(compass({
			//config_file: 'config.rb',
			sass 	: 'components/sass',
			image 	: 'images',
			require: ['susy'] //Responsive grid
		})
		.on('error', function(err){
			gutil.log('error : ', err);
		}))   
		.pipe(gulp.dest(destinations['css']))   
		//'susy' works with compass.
		//In project directory, run: 'sudo gem install susy'
		.pipe(connect.reload()) //keeps track of any compass activities
});


//watch some activities and trigger some tasks in response ........................
gulp.task('watch', function(){  
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/development/*.html', ['html']);
});


//connect to server and live reload task ..........................................
gulp.task('connect', function(){
	connect.server({
		root : 'builds/development/',
		livereload : true
	});
});


//keep track of any activity on HTML files ........................................
gulp.task('html', function(){
	gulp.src('builds/development/*.html') 
		.pipe(connect.reload());
});  

//default tasks ...................................................................
gulp.task('default', ['html', 'compass', 'connect', 'watch']);

