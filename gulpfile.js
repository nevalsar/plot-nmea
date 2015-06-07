var gulp = require('gulp')
var pkg = require('./package')
var gshell = require('gulp-shell')
var gutil = require('gulp-util')
var NwBuilder = require('node-webkit-builder')
var rimraf = require('rimraf')

gulp.task('build', ['clean'], function() {
    var webapp = new NwBuilder({
        appName: pkg.window.title,
        appVersion: pkg.version,
        buildDir: 'dist',
        files: ['package.json', 'src/**', 'LICENSE', 'Readme.md', 'node_modules/**'],
        platforms: ['linux64', 'linux32', 'win64', 'win32', 'osx64', 'osx32'],
        buildType: 'default'
    })

    webapp.on('log', gutil.log)

    return webapp.build().catch(gutil.log)
})

gulp.task('clean', function(callback) {
    rimraf('dist', callback)
})

gulp.task('default', gshell.task([
    './node_modules/nw/bin/nw . --debug'
]))
