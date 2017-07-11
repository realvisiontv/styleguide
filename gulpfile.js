var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var outputPath = 'docs';

gulp.task('styleguide:generate', function() {
    gulp.src(['fonts/**'])
        // Do image sprites, optimizations etc.
        .pipe(gulp.dest('./fonts'))
        .pipe(gulp.dest(outputPath + '/fonts'));

    return gulp.src('sass/*.scss')
        .pipe(styleguide.generate({
            title: 'Real Vision Styleguide',
            server: true,
            rootPath: outputPath,
            appRoot: '/styleguide',
            overviewPath: 'README.md',
            server: false,
            disableHtml5Mode: true
        }))
        .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
    return gulp.src('sass/default.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(outputPath));
});

gulp.task('watch', ['styleguide'], function() {
    // Start watching changes and update styleguide whenever changes are detected
    // Styleguide automatically detects existing server instance
    gulp.watch(['sass/*.scss'], ['styleguide']);
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);