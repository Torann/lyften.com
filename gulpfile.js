var gulp       = require('gulp'),
    gulpif     = require('gulp-if'),
    less       = require('gulp-less'),
    concat     = require('gulp-concat'),
    minifyCSS  = require('gulp-minify-css'),
    uglify     = require('gulp-uglify'),
    watch      = require('gulp-watch'),
    rename     = require('gulp-rename'),
    argv       = require('yargs').argv,
    prefix     = require('gulp-autoprefixer'),
    rev        = require('gulp-rev');

// Options
var options = {
    target: argv.target || 'public/assets',
    env: argv.env || 'local'
};

// Is a production build
var IS_PROD_BUILD = (options.env === 'production');

// Error catcher
function swallowError (err) {
    console.error(err);
    throw err;
}

// Compile Less and save to stylesheets directory
gulp.task('less', function () {

    var destDir = options.target + '/css/',
        destFile = 'style.css';

    return gulp.src('resources/assets/less/master.less')
        .pipe(less())
        .on('error', swallowError)
        .pipe(prefix('last 2 versions', '> 1%', 'Explorer 7', 'Android 2'))
        .pipe(gulpif(IS_PROD_BUILD, minifyCSS()))
        .pipe(rename(destFile))
        .pipe(gulp.dest(destDir));
});

// Publish JavaScript
gulp.task('scripts', function () {

    var destDir = options.target + '/js/',
        destFile = 'app.js';

    return gulp.src([
            'resources/assets/js/jquery.tweet.js',
            'resources/assets/js/imagesloaded.pkgd.js',
            'resources/assets/js/isotope.pkgd.js',
            'resources/assets/js/matchMedia.js',
            'resources/assets/js/jquery.throttle.js',
            'resources/assets/js/waypoints.min.js',
            'resources/assets/js/main.js'
        ])
        .on('error', swallowError)
        .pipe(concat(destFile))
        .pipe(gulpif(IS_PROD_BUILD, uglify()))
        .pipe(gulp.dest(destDir));
});

// What tasks does running gulp trigger?
gulp.task('default', ['build']);

gulp.task('watch', ['build'], function() {
    gulp.watch('resources/assets/less/**/*.less', ['less']);
    gulp.watch('resources/assets/js/**/*.js', ['scripts']);
});

gulp.task('build', ['less', 'scripts'], function () {
    // Create manifest of assets
    if (IS_PROD_BUILD) {
        return gulp.src(options.target + '/**/*.{css,js}')
            .pipe(gulp.dest(options.target))
            .pipe(rev())
            .pipe(gulp.dest(options.target))
            .pipe(rev.manifest())
            .pipe(gulp.dest('./'));
    }
});