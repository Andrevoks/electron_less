const gulp = require('gulp');  // плагин галпа
const del = require('del'); // для удаления
const packageJson = require('./package.json');
const electron = require('gulp-electron');
// path = require('path'),
    // gp_concat = require('gulp-concat'),
    // gp_rename = require('gulp-rename'),
    // gp_uglify = require('gulp-uglify'), // для сжатия файлов
    // cleanCSS = require('gulp-clean-css');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('hello', function () {
    console.log('hello');
});


gulp.task('clean', function () {
    return del('dist')
});

// gulp.task('copy', function () {
//     gulp.src('')
//         .pipe(gulp.dest(''));
//     gulp.src('')
//         .pipe(gulp.dest(''));
// });












// gulp.task('default', function () {
//     return gulp.src('public/**/*.*.{js,css}')
//         .on('data', function (file) {
//             // console.log(file);
//         })
//         .pipe(gulp.dest(function (file) { // пакуем нужные файлы в нужные директории
//             console.log(path.extname(file.relative));
//             return path.extname(file.relative) == '.js' ? 'js' :
//             path.extname(file.relative) == '.css' ? 'css' : 'dest';
//         }))
// });

//
// gulp.task('minify-css', function () {
//     return gulp.src([
//         ])
//         .pipe(gp_concat('concat.css'))
//         .pipe(cleanCSS({compatibility: 'ie8'}))
//         .pipe(gulp.dest('./webapp/static/css/'));
// });
//
// gulp.task('js-fef', function () {
//     return gulp.src([
//
//     ])
//         .pipe(gp_concat('concat.js'))
//         .pipe(gulp.dest('./webapp/static/js'))
//         .pipe(gp_rename('uglify.js'))
//         .pipe(gp_uglify())
//         .pipe(gulp.dest('./webapp/static/js'));
// });

// gulp.task('default', ['js-fef', 'minify-css','copy'], function () {});
