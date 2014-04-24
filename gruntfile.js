module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            modules: ''
        },
        bower: {
            options: {
                cleanBowerDir: true,
                cleanTargetDir: true,
                layout: 'byComponent',
                targetDir: './src/vendor'
            },
            install: {
            }
        },
        less: {
            development: {
                files: {
                    'src/vendor/app/main.css': 'src/less/main.less',
                    'src/vendor/bootstrap/bootstrap.css': 'src/vendor/bootstrap/less/bootstrap.less'
                }
            },
            production: {
                options: {
                    cleancss: true,
                    report: 'min'
                },
                files: {
                    'assets/css/main.min.css': 'src/less/main.less',
                    'assets/css/bootstrap/css/bootstrap.min.css': 'src/vendor/bootstrap/less/bootstrap.less'
                }
            }
        },
        concat: {
            app: {
                options: {
                    banner: '<%= meta.modules %>\n'
                },
                src: ['src/front/**/*.js'],
                dest: 'src/vendor/app/public.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dev: {
                files: {
                    'assets/js/app.min.js': ['<%= concat.app.dest %>']
                }
            },
            dist: {
                files: {
                    'assets/js/app.min.js': ['<%= concat.app.dest %>'],
                    'assets/js/angular/angular.min.js': [
                        'src/vendor/angular/angular.js',
                        'src/vendor/angular-route/angular-route.js',
                        'src/vendor/angular-cookies/angular-cookies.js',
                        'src/vendor/angular-resource/angular-resource.js',
                        'src/vendor/angular-sanitize/angular-sanitize.js'
                    ],
                    'assets/js/angular-ui/bootstrap.min.js': 'src/vendor/angular-bootstrap/ui-bootstrap-tpls.js'
                }
            }
        },
        jshint: {
            files: ['gruntfile.js', 'server.js', 'src/front/**/*.js', 'src/back/**/*.js', 'test/unit/**/*.spec.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        express: {
            options: {
                port: process.env.PORT || 1337
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            },
            prod: {
                options: {
                    script: 'server.js',
                    node_env: 'production',
                    background: false
                }
            },
            test: {
                options: {
                    script: 'server.js',
                    background: false
                }
            }
        },
        concurrent: {
            development: {
                tasks: ['watch:validate', 'watch:scripts', 'watch:css'],
                options: {
                    logConcurrentOutput: true
                }
            },
            deploy: {
                tasks: ['compile', 'less'],
                options: {
                    logConcurrentOutput: false
                }
            }
        },
        watch: {
            validate: {
                files: ['test/unit/**/*.spec.js'],
                tasks: ['validate']
            },
            scripts: {
                files: ['src/front/**/*.js'],
                tasks: ['validate', 'concat', 'uglify:dev']
            },
            css: {
                files: ['src/less/**/*.less'],
                tasks: ['less']
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            watch: {
                background: true
            },
            continuous: {
                singleRun: true
            }
        },
        coveralls: {
            options: {
                debug: true,
                coverage_dir: 'logs/karma/',
                dryRun: true,
                force: true
            }
        },
        plato: {
            report: {
                files: {
                    'logs/plato': ['src/front/**/*.js', 'src/back/**/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-karma-coveralls');

    grunt.registerTask('validate', 'Validate standards', function () {
        grunt.task.run('jshint');
    });

    grunt.registerTask('test', 'Run Tests', function () {
        grunt.task.run('karma:continuous');
        grunt.task.run('plato');
    });

    grunt.registerTask('compile', 'Create build files', function () {
        grunt.task.run(['concat', 'uglify:dist']);
    });

    grunt.registerTask('copy-assets', 'Copy required vendor assets', function () {
        var copyDirectory = function(prefix, abspath, rootdir, subdir, filename) {
            if (subdir) {
                grunt.file.copy(abspath, prefix + subdir + '/' + filename);
            } else {
                grunt.file.copy(abspath, prefix + filename);
            }
        };

        // Bootstrap
        var callbackBootstrap = function (abspath, rootdir, subdir, filename) {
            copyDirectory('assets/css/bootstrap/fonts/', abspath, rootdir, subdir, filename);
        };
        grunt.file.mkdir('assets/css/bootstrap/fonts');
        grunt.file.recurse('src/vendor/bootstrap/fonts', callbackBootstrap);

        // Font Awesome
        var callbackFontAwesome = function (abspath, rootdir, subdir, filename) {
            copyDirectory('assets/css/font-awesome/', abspath, rootdir, subdir, filename);
        };
        grunt.file.mkdir('assets/css/font-awesome');
        grunt.file.recurse('src/vendor/font-awesome', callbackFontAwesome);
    });

    grunt.registerTask('dist', 'Copy Artifacts', function () {
        if (process.env.CI) {
            grunt.task.run('compress');
        } else {
            console.log('* Running locally so no copy required *');
        }
    });

    grunt.registerTask('default', ['validate', 'bower', 'test', 'copy-assets', 'concurrent:deploy', 'express:prod']);
    grunt.registerTask('build', ['validate', 'bower', 'compile', 'less', 'copy-assets']);
    grunt.registerTask('test-only', ['validate', 'test']);
    grunt.registerTask('run', ['validate', 'express:dev', 'concurrent:development']);

};
