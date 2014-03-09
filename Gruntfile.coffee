'use strict';

module.exports = (grunt) ->
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

    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-stylus'

    grunt.registerTask 'default', ['stylus', 'watch']
