const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    cleanCSS = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    // rename = require("gulp-rename"),
    // inlineCss = require('gulp-inline-css'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync');
sass.compiler = require('node-sass');

//----------------------gulp image-------------------------//

gulp.task('img', () =>
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('svg', () =>
    gulp.src('app/img/svg/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/svg/'))
);

gulp.task('image', gulp.parallel('img', 'svg'));

//----------------------gulp build------------------------//

gulp.task('html', () =>
    gulp.src('app/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
);

gulp.task('css', () =>
    gulp.src('app/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
);

gulp.task('babel', () =>
    gulp.src('app/script.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
);

gulp.task('build', gulp.parallel('html', 'css', 'babel'));

//--------------------gulp default------------------------//
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "app"
        },
        notify: false
    });
});

gulp.task('sass', function () {
    return gulp.src('app/css/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 version', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
    return gulp.src('app/*.js')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('code', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function () {
    gulp.watch('app/css/*.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('code'));
    gulp.watch('app/*.js', gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));