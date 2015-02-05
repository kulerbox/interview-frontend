module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var config = {
        app: 'app',
        dist: 'dist'
    };



    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        config: config,
        //task config

        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>',
                },
                files: [
                    '<%= config.app %>/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= config.app %>/scripts/{,*/}*.js',
                    '<%= config.app %>/images/{,*/}*.*'
                ]
            },
            sass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:server']
            },
            assemble: {
                files: [
                    '<%= config.app %>/assemble/layouts/master.hbs',
                    '<%= config.app %>/assemble/pages/*.hbs',
                    '<%= config.app %>/assemble/pages/*.md'
                ],
                tasks: ['assemble']
            },
            images: {
                files: ['images/**/*.{png,jpg,gif}'],
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    },
                    open: true,
                    base: [
                        '.tmp',
                        '<%= config.app %>'
                    ]
                }
            },
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        sass: {
            options: {
                sourcemap: true,
                loadPath: 'bower_components'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.{scss,sass}'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.{scss,sass}'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        // Automatically inject Bower components into the HTML file
        // wiredep: {
        //     target: {
        //         src: '<%= config.app %>/index.html' // point to your HTML file.
        //     }
        // },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            html: {
                dot: true,
                src: [
                    '<%= config.dist %>{,*/}*.html',
                    '!<%= config.dist %>{,*/}jackpot.html'
                ]

            },
            server: '.tmp'
        },

        // Options for assemble which builds html pages
        assemble: {
            options: {
                flatten: true,
                layout: ['<%= config.app %>/assemble/layouts/master.hbs'],
                plugins: ['permalinks']
            },
            site: {
                src: ['<%= config.app %>/assemble/pages/*.hbs'],
                dest: '<%= config.app %>'
            }
        },


        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/images/{,*/}*.*'
                    ]
                }
            }
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },
        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css'],
            js: ['<%= config.dist %>/scripts/*.js'],
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images'],
                patterns: {
                    js: [
                        [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ]
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= config.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= config.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        copy: {
            dist: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        dest: '<%= config.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            'images/{,*/}*',
                            '{,*/}*.html',
                            'styles/fonts/{,*/}*.*',

                        ]
                    },
                ]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '.tmp/concat/',
                dest: '<%= config.dist %>',
                src: '{,*/}*.css'
            },
            scripts: {
                expand: true,
                dot: true,
                cwd: '.tmp/concat/',
                dest: '<%= config.dist %>',
                src: '{,*/}*.js'
            },
            aspx: {
                expand: true,
                dot: true,
                cwd: '<%= config.dist %>',
                dest: '<%= config.dist %>/',
                src: '{,*/}*.html',
                rename: function(dest, src) {
                    return dest + src.replace(/index.html$/, 'default.aspx');
                }
            },
            backup: {
                expand: true,
                dot: true,
                cwd: '.',
                dest: 'l:\\splashpages\\<%= pkg.casinoFolder %>\\<%= pkg.name %>',
                src: '**/*.*'
            },
            post: {
                expand: true,
                dot: true,
                cwd: '<%= config.dist %>',
                dest: 'm:\\Offers\\<%= pkg.casinoRemoteFolder %>\\<%= pkg.name %>',
                src: '**/*.*'
            }
        }
    });

    grunt.loadNpmTasks('assemble');

    //register tasks
    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'assemble',
            'connect:livereload',
            // 'wiredep',
            'watch',
            'sass',
            'open'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'sass',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'copy:styles',
        'copy:scripts',
        'rev',
        'usemin',
        'copy:aspx',
        'clean:html'
    ]);

    grunt.registerTask('backup', [
        'copy:backup'
    ]);

    grunt.registerTask('post', [
        'copy:post'
    ]);

    grunt.registerTask('default', ['build']);
};
