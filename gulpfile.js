var gulp = require('gulp');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include')
var minify = require('gulp-minify');
var mainBowerFiles = require('main-bower-files')
var del = require('del')

var paths = {
    main: 'app/scripts/init.js',
    js: [
         'app/models/*.js',
         'app/scripts/*.js'
    ],
    css: [
        'app/*.css',
        'app/styles/*.less'
    ],
    html: [
        'app/views/*.html',
        'app/views/**/*.html'
    ],
    aspx: 'app/app.aspx'
}
var dest = './dist'
var bld = dest + '/_temp/'
var buildpaths = {
    js: [
        bld + '/*.js',
        bld + '**/*.js'
    ],
    css: [
        bld + '/*.css',
        bld + '**/*.css'
    ],    
    html: [
        bld + '/*.html',
        bld + '**/*.html'
    ],
    minjs: [
        bld + '/*min.js',
        bld + '**/*min.js'
    ]
}

gulp.task('clean', ['build'], function(){
    // clean up the dist folder    
    return del(bld, {force:true})
})

gulp.task('third-party', function(){
    // copy vendor scripts
    return gulp.src(mainBowerFiles())
        .pipe(concat('vendor.js'))
        .pipe(minify())
        .pipe(gulp.dest(bld)) 
})

gulp.task('app', function(){
    // compile app scripts
    return gulp.src(paths.main)
    .pipe(fileinclude({
        prefix: '// @@',
        basepath: '@file'   // relative path
    }))
    .pipe(concat('app.js'))
    .pipe(minify())
    .pipe(gulp.dest(bld))
})

gulp.task('css', function(){
    return gulp.src(paths.css)
    .pipe(concat('app.css'))
    .pipe(gulp.dest(bld))
})

gulp.task('html', function(){
    return gulp.src(paths.html)
    .pipe(concat('app.html'))
    .pipe(gulp.dest(bld))
})

gulp.task('build', ['third-party', 'app', 'css', 'html'], function(){
    // build aspx

    return gulp.src(paths.aspx)
        .pipe(fileinclude({
            prefix: '// @@',
            basepath: bld
        }))        
        .pipe(fileinclude({
            prefix: '@@',
            basepath: bld
        }))
        .pipe(gulp.dest(dest))
})

gulp.task('default', ['build', 'clean'])


