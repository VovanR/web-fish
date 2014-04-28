# gruntjs.com

module.exports = (grunt) ->
    'use strict';

    require('load-grunt-tasks')(grunt)

    grunt.initConfig
        stylus:
            # Компиляция Stylus в CSS
            compile:
                options:
                    'paths': [
                        'css/'
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
