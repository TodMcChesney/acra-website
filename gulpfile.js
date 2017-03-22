const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const rm = require('gulp-rm');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const processhtml = require('gulp-processhtml');
const htmlmin = require('gulp-htmlmin');

/** Dev tasks
* From the CLI use npm script to run tasks:
* $ npm run gulp (Runs all dev tasks in sequence and watches for changes)
*/

// compile:sass
gulp.task('compile:sass', () =>
    sass('src/scss/**/*.scss', {
        sourcemap: true
    })
    .on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write('maps', {
        includeContent: false,
        sourceRoot: 'source'
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
);

// browserSync
gulp.task('browserSync', () =>
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    })
);

// gulp (Set default 'gulp' task to run all dev tasks and watch for changes)
gulp.task('default', ['browserSync', 'compile:sass'], () => {
    gulp.watch('src/scss/**/*.scss', ['compile:sass']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/img/*.+(png|jpg|svg)', browserSync.reload);
});

/** Production tasks
* From the CLI use npm script to run tasks:
* $ npm run gulpBuild (Runs all production tasks in sequence to build dist folder)
*/

// clean:dist
gulp.task('clean:dist', () =>
    gulp.src('dist/**/*', {
        read: false
    })
    .pipe(rm())
);

// minify:css
gulp.task('minify:css', ['clean:dist'], () =>
    gulp.src('src/css/styles.css')
    .pipe(cssnano())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'))
);

// minify:html
gulp.task('minify:html', ['clean:dist'], () =>
    gulp.src('src/*.html')
    .pipe(processhtml())
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'))
);

// copy
gulp.task('copy', ['clean:dist'], () =>
    gulp.src(['src/doc/**/*', 'src/img/**/*.+(png|jpg|svg)', 'src/*.!(html)'], {
        base: 'src'
    })
    .pipe(gulp.dest('dist'))
);

// build
gulp.task('build', ['clean:dist', 'minify:css', 'copy', 'minify:html']);
