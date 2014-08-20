module.exports = function(grunt) {

    grunt.initConfig({
        coffee: {
            tomorrow: {
                options: {
                    join: true
                },
                files: {
                    'dist/tomorrow.js': [
                        'src/tomorrow.coffee'
                    ],
                    'tests/tomorrow-spec.js': [
                        'tests/*-spec.coffee'
                    ]
                }
            }
        },
        uglify: {
            tomorrow: {
                files: {
                    'dist/tomorrow.min.js': [
                        'dist/tomorrow.js'
                    ]
                }
            }
        },
        watch: {
            tomorrow: {
                files: [
                    'src/tomorrow.coffee',
                    'tests/*-spec.coffee'
                ],
                tasks: [
                    'coffee:tomorrow'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

};
