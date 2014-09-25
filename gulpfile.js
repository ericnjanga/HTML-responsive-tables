/**
* To install a module as a development dependency (example of browserify):
* npm install --save-dev browserify
*/

//tasks variables ..............................................................
var gulp 		= require('gulp'), 
	connect 	= require('gulp-connect'), 
	compass 	= require('gulp-compass');


//..............................................................................
var env,
	sources,
	outputDir;


//environment variable ..........................................................
/**
 * command for executing gulp in production environment:
 * NODE_ENV=production gulp
*/
env = process.env.NODE_ENV || 'development';


//processed files destination depends on the environment ........................
if(env==='development'){
	outputDir = 'builds/development/'; 
}else{
	outputDir = 'builds/production/'; 
}


//sources variable ..............................................................
sources = { 
	'sass' 		: ['components/sass/style.scss'],
	'html' 		: [outputDir+'*.html']
};


//destinations variable .........................................................
var destinations = { 
	'js' 		: outputDir+'js',
	'css'		: outputDir+'css'		 
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
		root : outputDir,
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

