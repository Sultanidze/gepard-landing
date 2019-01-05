import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import gulpSequence from 'gulp-sequence';
import sass         from 'gulp-sass';
import sourcemaps   from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS     from 'gulp-clean-css';
import browserSync  from 'browser-sync';
//import notify from 'gulp-notify';
import cache        from 'gulp-cache';
import imagemin     from 'gulp-imagemin';
import del          from 'del';
//import concat       from 'gulp-concat';
import uglify       from 'gulp-uglify';
import path         from 'path';
//import babel        from 'gulp-babel';
import named        from 'vinyl-named';
import webpack      from 'webpack-stream';

import webpackConfig from './webpack.config.babel';

const isProduction = process.env.NODE_ENV === 'production'

var src = {
    root: 'src/',
	html: 'src/*.html',
	sass: 'src/sass/**/*.+(scss|sass)',
//    sassModules: [],
	js: 'src/js/**/*.js',
	jsPlugins: 'src/js/plugins/*.js',
	jsEntries: 'src/js/*.js',
    assets: 'src/assets/',
    fonts: 'src/assets/fonts/**/*.*',
	img: 'src/assets/img/**/*.+(png|jpg|gif|svg|ico)',
//	sprite: 'src/assets/sprite/*',
};

//src.sassModules = src.sassModules.map(function(path){return src.nodeModules + path});
	
var dist = {
    root: 'dist/',
	css: 'dist/css/',
	js: 'dist/js/',
    assets: 'dist/assets/',
    fonts: 'dist/assets/fonts/',
	img: 'dist/assets/img/',
//	sprite: 'img/sprite/',
};

gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('sass', function() {
	return gulp.src(src.sass)
		.pipe(sourcemaps.init())
			.pipe(sass({
				includePaths: ['node_modules']
			}).on('error', sass.logError))
			.pipe(autoprefixer())
			// .pipe(autoprefixer(['last 10 major versions', "Firefox > 20", '> 0.1%', 'ie 10-11']))
			.pipe(gulpif(isProduction, cleanCSS()))
	    .pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(dist.css))
		.pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src(src.html)
    // .pipe(gulpif(process.env.NODE_ENV === 'production', htmlmin({ 
        // collapseWhitespace: true ,
        // removeComments: true
    // })))
    .pipe(gulp.dest(dist.root));
});

gulp.task('fonts', function(){
	return gulp.src(src.fonts)
    .pipe(gulp.dest(dist.fonts));
});
    
gulp.task('img', function() {
	return gulp.src(src.img)
		.pipe(cache(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false},
					{cleanupAttrs: false}
				]
			})
		], 
		{
			verbose: true
		})))
		.pipe(gulp.dest(dist.img));
});

gulp.task('assets', ["fonts", "img"], function() {
    return gulp.src(src.assets + "*.*")
        .pipe(gulp.dest(dist.assets))
});
    
gulp.task('js', function () {
    return gulp.src(src.jsEntries)
        .pipe(named())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(dist.js));
});

	
gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: dist.root
		},
		port: 9000,
		logPrefix: "browserSync"
	});
	gulp.watch(src.sass, ['sass']).on('change', browserSync.reload);
	gulp.watch(src.html, ['html']).on('change', browserSync.reload);
	gulp.watch(src.js, ['js']).on('change', browserSync.reload);
	gulp.watch(src.fonts, ['fonts']).on('change', browserSync.reload);
	gulp.watch(src.img, ['img']).on('change', browserSync.reload);
});

gulp.task('cleanCache', function (callback) {
    return cache.clearAll();
});
gulp.task('clean', ['cleanCache'], function() {
    return del(dist.root).then(paths =>{
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

gulp.task('build', ['assets', 'sass', 'js', 'html']);

gulp.task('prod', gulpSequence('set-prod-node-env', 'clean', 'build'));
gulp.task('dev', gulpSequence('set-dev-node-env', 'build', 'serve'));
gulp.task('default', ['dev']);