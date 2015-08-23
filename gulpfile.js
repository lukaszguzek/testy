var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	clean = require('gulp-clean'),
	watch = require('gulp-watch'),
	less = require('gulp-less'),
	sync = require('browser-sync').create(),
	srcCss = './src/css/',
	srcJs = './src/js/',
	srcHtml = './src/*.html',
	targetHtml = './app/',
	targetCss = './app/css/',
	targetJs = './app/js';

gulp.task('cleanHtml', function () {
	return gulp.src('./app/*.html', {read:false})
		.pipe(clean());
})

gulp.task('buildHtml', ['cleanHtml'], function () {
	return gulp.src(srcHtml)
		.pipe(gulp.dest(targetHtml));
})

gulp.task('cleanCss', function () {
		return gulp.src(targetCss + '*.css')
			.pipe(clean());
})

gulp.task('buildCss', ['cleanCss'], function () {
	gulp.src('./src/css/*.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(minifyCss())
		.pipe(concat('main.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./app/css/'))
})
gulp.task('cleanJs', function () {
	gulp.src('./app/js/*.js')
	.pipe(clean());
})

gulp.task('buildJs', ['cleanJs'], function () {
	gulp.src('./src/js/*.js')
/*		.pipe(sourcemaps.init())
		.pipe(uglify())*/
		.pipe(concat('main.js'))
/*		.pipe(sourcemaps.write())*/
		.pipe(gulp.dest('./app/js/'))
})

gulp.task('watch', function () {
	sync.init({
		server: {
			baseDir: './app/',
			index: 'index.html',
			port: 3010
		}
	});

	gulp.watch('./src/*.html', ['buildHtml']);
	gulp.watch('./app/*.html').on('change', sync.reload);
	gulp.watch('./src/css/*.less', ['buildCss']).on('change', sync.reload);
	gulp.watch('./src/js/*.js', ['buildJs']).on('change', sync.reload);
});

