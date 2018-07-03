const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const ts = require('gulp-typescript');

const basePath = './app/public/';
const dist = './dist/';

/**
 * 复制pollyfill到 basePath目录
 */
gulp.task('copy-pollyfill', () => {
	return gulp.src('./node_modules/@cmos/web/pollyfill/babel/*.js')
		.pipe(gulp.dest(basePath + './js'));
});

/**
 * 拷贝静态资源文件
 */
gulp.task('copy-static-files', () => {
	return gulp.src('pages/**/*')
		.pipe(gulp.dest(basePath));
});

gulp.task('uglify', () => {
	gulp.src([basePath + '**/common.js'])
		.pipe(uglify({ ie8: true }))
		.pipe(gulp.dest(basePath));
});

gulp.task('copy-files', gulpSequence(['copy-pollyfill', 'copy-static-files', 'uglify']));
gulp.task('copy-files-dev', gulpSequence(['copy-pollyfill', 'copy-static-files']));

/**
 * 监听静态资源文件变化，复制到basePath目录下
 */
gulp.task('watch', () => {
	return watch('./pages/**/*')
		.pipe(gulp.dest(basePath));
});
/**
 * 编译ts文件
 */
gulp.task('tsc', function () {
	const tsProject = ts.createProject('./tsconfig.json');
	return gulp.src('src/**/*.ts')
		.pipe(tsProject())
		.pipe(gulp.dest(dist));
});