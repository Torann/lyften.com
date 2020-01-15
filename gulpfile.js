var gulp       = require('gulp'),
    gulpif     = require('gulp-if'),
    sass       = require('gulp-sass'),
    concat     = require('gulp-concat'),
    minifyCSS  = require('gulp-minify-css'),
    uglify     = require('gulp-uglify'),
    watch      = require('gulp-watch'),
    rename     = require('gulp-rename'),
    imagemin   = require('gulp-imagemin'),
    argv       = require('yargs').argv,
    prefix     = require('gulp-autoprefixer'),
    connect    = require('gulp-connect'),
    shell      = require('gulp-shell'),
    rev        = require('gulp-rev');

// Options
var options = {
    target: argv.target || 'public',
    host: argv.host || 'localhost',
    port: argv.port || 8000,
    env: argv.env || 'local',
    livereload: argv.livereload || false
};

// Is a production build
var IS_PROD_BUILD = (options.env === 'production');

// Error catcher
function swallowError (err) {
    console.error(err);
    throw err;
}

// Compile sass and save to css directory
gulp.task('sass', function () {

    var destDir = options.target + '/assets/css/',
        destFile = 'style.css';

    return gulp.src('source/assets/sass/master.scss')
        .pipe(sass())
        .on('error', swallowError)
        .pipe(prefix('last 2 versions', '> 1%', 'Explorer 7', 'Android 2'))
        .pipe(gulpif(IS_PROD_BUILD, minifyCSS()))
        .pipe(rename(destFile))
        .pipe(gulp.dest(destDir));
});

// Publish Images
gulp.task('images', function () {
    if (IS_PROD_BUILD) {
        var destDir = options.target + '/assets/images';

        return gulp.src('source/assets/images/*')
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}]
            }))
            .pipe(gulp.dest(destDir));
    }
});

// Publish JavaScript
gulp.task('js', function () {

    var destDir = options.target + '/assets/js/',
        destFile = 'app.js';

    return gulp.src([
            //'source/assets/js/imagesloaded.pkgd.js',
            'source/assets/js/waypoints.min.js',
            'source/assets/js/isotope.pkgd.js',
            'source/assets/vendor/prism/prism.js',
            'source/assets/js/main.js'
        ])
        .on('error', swallowError)
        .pipe(concat(destFile))
        .pipe(gulpif(IS_PROD_BUILD, uglify()))
        .pipe(gulp.dest(destDir));
});

// Webserver
gulp.task('webserver', function() {
    connect.server({
        host: options.host,
        port: options.port,
        livereload: options.livereload,
        root: options.target
    });
});

// Run skosh build command on pages
gulp.task('compile-pages', shell.task([
    'php skosh build --part=pages'
]));

// Run skosh build command on static content
gulp.task('compile-images', shell.task([
    'php skosh build --part=static'
]));

// What tasks does running gulp trigger?
gulp.task('default', ['build']);

gulp.task('serve', ['webserver', 'watch']);

gulp.task('watch', ['compile-pages', 'compile-images', 'build'], function() {
    gulp.watch('source/assets/sass/**/*.scss', ['sass']);
    gulp.watch('source/assets/js/**/*.js', ['js']);
    gulp.watch('source/assets/images/*', ['compile-images']);
    gulp.watch('source/uploads/**/*', ['compile-images']);
    gulp.watch('source/**/*.{textile,twig,md,xml}', ['compile-pages']);
});

gulp.task('build', ['images', 'sass', 'js'], function () {
    // Create manifest of assets
    if (IS_PROD_BUILD) {
        return gulp.src(options.target + '/assets/**/*.{css,js,svg,png,gif,jpg,jpeg}')
            .pipe(gulp.dest(options.target + '/assets/'))
            .pipe(rev())
            .pipe(gulp.dest(options.target + '/assets/'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('./'));
    }
});