var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var outputPath = 'docs';
var server = require('./server');
var options = {
    title: 'Real Vision Styleguide',
    rootPath: outputPath,
    appRoot: '/styleguide',
    overviewPath: 'README.md'
};

gulp.task('styleguide:generate', function() {
    gulp.src(['fonts/**'])
        .pipe(gulp.dest(outputPath + '/fonts'));
    gulp.src(['node_modules/font-awesome/fonts/**'])
        .pipe(gulp.dest(outputPath + '/fonts/font-awesome'));

    gulp.src(['images/**'])
        .pipe(gulp.dest('./images'))
        .pipe(gulp.dest(outputPath + '/images'));

    return gulp.src('sass/*.scss')
        .pipe(styleguide.generate(options))
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

    var app = server(options),
        port = process.env.PORT || 3000;

    app.listen(port, function() {
        console.log('Express server listening on port 3000. http://localhost:' + port);
    });
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);