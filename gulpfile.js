// ************************************************************************** //
//  ╦╔═╗╔╗╔  ╔═╗╔═╗╔═╗╔═╗╔═╗╦  ╔═╗╦═╗
//  ║╠═╣║║║  ╠╣ ╠═╣║╣ ╚═╗╚═╗║  ║╣ ╠╦╝
// ╚╝╩ ╩╝╚╝  ╚  ╩ ╩╚═╝╚═╝╚═╝╩═╝╚═╝╩╚═
//
// AUTH: Jan Fässler
// MAIL: jan@faessler.be
// COPY: © 2017
// ************************************************************************** //


// ********************************** //
// INCLUDES & VARIABLES
// ********************************** //
var gulp         = require('gulp'),
    autoprefixer = require('autoprefixer'),
    browserSync  = require('browser-sync').create(),
    cleanCSS     = require('gulp-clean-css'),
    imagemin     = require('gulp-imagemin'),
    inject       = require('gulp-inject'),
    inlineSvg    = require('gulp-inline-svg'),
    postcss      = require('gulp-postcss'),
    pug          = require('gulp-pug'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    svgMin       = require('gulp-svgmin'),
    gulpWebpack  = require('gulp-webpack'),
    webpack      = require('webpack');

var dest = './dist',
    src  = './src';



// ********************************** //
// TASKS
// ********************************** //
// SCSS
gulp.task('scss:app', function() {
    return gulp.src(src+'/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});
gulp.task('scss', gulp.parallel('scss:app'));


// JS
gulp.task('js:app', function() {
    return gulp.src(src+'/js/app.js')
    .pipe(gulpWebpack({
        entry: [
            src+'/js/app.js'
        ],
        output: {
            filename: 'app.js'
        },
        devtool: 'source-map',
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true
            })
        ]
    }, webpack))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});
gulp.task('js', gulp.parallel('js:app'));


// PUG
gulp.task('pug:app', function() {
    return gulp.src(src+'/pug/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});
gulp.task('pug:inject', function () {
    return gulp.src('./dist/*.html')
    .pipe(inject(gulp.src([
        dest + '/**/*.js',
        dest + '/**/*.css'
    ], {read: false}), {relative: true}))
    .pipe(gulp.dest('./dist'));
});
gulp.task('pug', gulp.series('pug:app', 'pug:inject'));


// IMGS
gulp.task('favicons:main', function() {
    return gulp.src(src+'/favicons/favicon.ico')
        .pipe(gulp.dest(dest));
});
gulp.task('favicons:all', function() {
    return gulp.src(src+'/favicons/**/*')
        .pipe(gulp.dest(dest+'/favicons'));
});
gulp.task('favicons', gulp.parallel('favicons:main', 'favicons:all'));
gulp.task('inline-svg', function() {
    return gulp.src(src+'/img/**/*.svg')
        .pipe(svgMin())
        .pipe(inlineSvg())
        .pipe(gulp.dest(src+'/scss'));
});
gulp.task('img', gulp.parallel('inline-svg', 'favicons'));


// BROWSER-SYNC
gulp.task('browser-sync', function(done) {
    browserSync.init({
        server: {
            baseDir: dest,
            open: false
        }
    });
    done();
});



// ********************************** //
// WATCHER
// ********************************** //
gulp.task('watch', function(done){
    gulp.watch(src+'/scss/**/*.scss').on('change', gulp.parallel('scss'));
    gulp.watch(src+'/js/**/*.js').on('change', gulp.parallel('js'));
    gulp.watch(src+'/pug/**/*.pug').on('change', gulp.parallel('pug'));
    gulp.watch(src+'/pug/**/*.svg').on('added', gulp.parallel('img'));
    gulp.watch(src+'/pug/**/*.svg').on('change', gulp.parallel('img'));
    done();
});



// ********************************** //
// DEFAULT TASKS
// ********************************** //
// DEFAULT TASK
gulp.task('default', gulp.series('img', gulp.parallel('scss', 'js'), 'pug', 'browser-sync', 'watch'));

// PRODUCTION TASK
gulp.task('prod', gulp.series('img', gulp.parallel('scss', 'js'), 'pug'));
