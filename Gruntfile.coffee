# gruntjs.com

module.exports = (grunt) ->
    'use strict'

    require('load-grunt-tasks')(grunt)

    debug = !!grunt.option('debug')

    grunt.initConfig
        stylus:
            compile:
                options:
                    'paths': [
                        'static/css/'
                    ]
                    use: [
                        () -> (require 'autoprefixer-stylus')('last 2 versions', 'ie 8')
                        debug or (require 'csso-stylus')
                    ]
                files:
                    'static/css/style.css': 'static/css/style.styl'

        jshint:
            all:
                src: [
                    'static/js/**/*.js'
                ]
                options:
                    reporter: require('jshint-stylish')
                    curly: true
                    eqeqeq: true
                    freeze: true
                    latedef: true
                    newcap: true
                    nonbsp: true
                    nonew: true
                    plusplus: false
                    quotmark: 'single'
                    undef: true
                    browser: true
                    globals:
                        jQuery: true
                        console: true

        jscs:
            all:
                src: [
                    'static/js/**/*.js'
                ]

        watch:
            stylus:
                files: [
                    'static/css/*.styl'
                ]
                tasks: 'stylus'

            jshint:
                files: [
                    'static/js/**/*.js'
                ]
                tasks: 'newer:jshint:all'

            jscs:
                files: [
                    'static/js/**/*.js'
                ]
                tasks: 'newer:jscs:all'

    grunt.registerTask 'lint', ['jshint', 'jscs']
    grunt.registerTask 'default', ['stylus', 'lint', 'watch']
