# gruntjs.com

module.exports = (grunt) ->
    'use strict';

    require('load-grunt-tasks')(grunt)

    debug = !!grunt.option('debug')

    grunt.initConfig
        stylus:
            # Компиляция Stylus в CSS
            compile:
                options:
                    'paths': [
                        'css/'
                    ]
                    use: [
                        () -> (require 'autoprefixer-stylus')('last 2 versions', 'ie 8')
                        debug or (require 'csso-stylus')
                    ]
                files:
                    'css/style.css': 'css/style.styl'

        watch:
            # Перекомпиляция стилей при изменении styl-файлов
            stylus:
                files: [
                    'css/*.styl'
                ]
                tasks: 'stylus'

    grunt.registerTask 'default', ['stylus', 'watch']
