const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()
const less = require('gulp-less')
const cssmin = require('gulp-minify-css')

gulp.task('default', ['less'], function() {
	nodemon({
		script: 'app.js',
		// 忽略部分对程序运行无影响的文件的改动
		// ignore: ['gulpfile.js', 'node-modules/**']
		ext: 'js',
		env: {'NODE_ENV': 'development'}
	}).on('start', function() {
		browserSync.init({
			proxy: 'http://127.0.0.1:3000',
			files: ['public/css/**', 'public/js/**', 'views/**'],
			// 在不同浏览器上镜像点击、滚动和表单，即所有浏览器都会同步 
			// ghostMode: { clicks: true, scroll: true }, 
			// 更改控制台日志前缀 
			// logPrefix: "learning browser-sync in gulp", 
			// 设置监听时打开的浏览器，下面的设置会同时打开chrome, firefox和IE 
			// browser: ["chrome", "firefox", "iexplore"],
			browser: 'chrome',
			// 设置端口
			port: 8000
		}, function() {
			console.log('browser refreshed')
		})
	})
})

gulp.task('less', function() {
	gulp.watch('public/less/**', ['lesschange'])
})

gulp.task('lesschange', function() {
	gulp.src('public/less/**')
		.pipe(less())
		.pipe(cssmin())
		.pipe(gulp.dest('public/css'))
})