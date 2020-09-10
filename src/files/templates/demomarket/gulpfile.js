/**
 * Сборщик css и js.
 *
 * 1) Сборка всех ресурсов:
 * $ npm install
 * $ gulp
 *
 * При отсутствии файла styles/skins/modern/data/modules/umiPushNotification/js/gen/site-push.min.js
 * можно дабавить его из репозитория: https://github.com/Umisoft/push-notification-module/blob/master/src/styles/skins/modern/data/modules/umiPushNotification/js/gen/site-push.min.js
 *
 * 2) Режим разработки, ресурсы автоматически пересобираются при сохранении исходных файлов:
 * $ gulp watch
 *
 * Требования:
 * node: 10.15.3
 * npm: 6.4.1
 * gulp-cli: 2.2.0
 */
const gulp = require('gulp');
const gutil = require('gulp-util');
const plugins = require('gulp-load-plugins')();
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const jsmin = require('gulp-minify');
const rimraf = require('gulp-rimraf');

const jsLibraries = [
	'js/lib/**/*.js',
	'../../styles/skins/modern/data/modules/umiPushNotification/js/gen/site-push.min.js'
];
const jsCommon = 'js/*.js';
const less = 'less/*.less';
const cssLibraries = 'css/lib/*.css';
const compiledCss = 'compiled/*.css';
const compiledJs = 'compiled/*.js';
const rimrafCss = 'compiled/*.min.css';
const rimrafJs = 'compiled/*-min.js';

const destination = 'compiled';

gulp.task('build-js-libraries', function() {
	return gulp.src(jsLibraries)
		.pipe(plugins.concat('demomarket.lib.js'))
		.pipe(gulp.dest(destination));
});

gulp.task('build-js-common', function() {
	return gulp.src(jsCommon)
		.pipe(plugins.concat('demomarket.js'))
		.pipe(gulp.dest(destination));
});

gulp.task('build-less', function() {
	return gulp.src('less/common.less')
		.pipe(plugins.plumber())
		.pipe(plugins.less())
		.on('error', function(err) {
			gutil.log(err);
			this.emit('end');
		})
		.pipe(plugins.autoprefixer({
			browsers: [
				'> 1%',
				'last 2 versions',
				'firefox >= 4',
				'safari 7',
				'safari 8',
				'IE 8',
				'IE 9',
				'IE 10',
				'IE 11'
			],
			cascade: false
		}))
		.pipe(plugins.concat('demomarket.css'))
		.pipe(gulp.dest(destination)).on('error', gutil.log);
});

gulp.task('cleancss', function() {
	return gulp.src(rimrafCss, { read: false })
		.pipe(rimraf())
		.on('error', function(err) {
			gutil.log(err);
			this.emit('end');
		});
});

gulp.task('cleanjs', function() {
	return gulp.src(rimrafJs, { read: false })
		.pipe(rimraf())
		.on('error', function(err) {
			gutil.log(err);
			this.emit('end');
		});
});

gulp.task('mincss', function () {
	return gulp.src(compiledCss)
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.on('error', function(err) {
			gutil.log(err);
			this.emit('end');
		})
		.pipe(gulp.dest(destination));
});

gulp.task('minjs', function() {
	return gulp.src(compiledJs)
		.pipe(jsmin())
		.on('error', function(err) {
			gutil.log(err);
			this.emit('end');
		})
		.pipe(gulp.dest(destination));
});

gulp.task('build-css-libraries', function() {
	return gulp.src(cssLibraries)
		.pipe(plugins.plumber())
		.on('error', function(err) {
			gutil.log(err);
			this.emit('end');
		})
		.pipe(plugins.concat('demomarket.lib.css'))
		.pipe(gulp.dest(destination)).on('error', gutil.log);
});

gulp.task('watch', function() {
	gulp.watch(jsLibraries, ['build-js-libraries']);
	gulp.watch(jsCommon, ['build-js-common']);
	gulp.watch(less, ['build-less']);
	gulp.watch(cssLibraries, ['build-css-libraries']);
});

gulp.task('clean', gulp.series('cleanjs', 'cleancss', function(done) {
	done();
}));

gulp.task('minify', gulp.series('minjs', 'mincss', function(done) {
	done();
}));

gulp.task('compile', gulp.series('cleanjs', 'cleancss', 'minjs', 'mincss', function(done) {
	done();
}));

gulp.task('build', gulp.series('build-js-libraries', 'build-js-common', 'build-less', 'build-css-libraries', 'compile', function(done) {
	done();
}));

gulp.task('default', gulp.series('build-js-libraries', 'build-js-common', 'build-less', 'build-css-libraries', 'compile', function(done) {
	done();
}));
