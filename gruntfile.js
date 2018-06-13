module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	var config = {
		pkg: grunt.file.readJSON("package.json"),
		meta: {
			banners: "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> License | <%= pkg.homepage %> */"
		},
		jshint: {
			src: [
				'src/js/jquery.buttonUI.js',
				'src/js/main.js'
			],
		},
		uglify: {
			compile: {
				options: {
					sourceMap: false,
					compress: true
				},
				files: {
					'docs/assets/js/jquery.buttonUI.min.js': 'src/js/jquery.buttonUI.js'
				},
			}
		},
		autoprefixer:{
			options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox 16.0', 'Opera 12.1', "Chrome 26.0"],
				cascade: false
			},
			buttonmin: {
				expand: true,
				flatten: true,
				src: [
					'test/css/jquery.buttonUI.min.css'
				],
				dest: 'docs/assets/css/'
			},
			buttonmax: {
				expand: true,
				flatten: true,
				src: [
					'test/css/jquery.buttonUI.css'
				],
				dest: 'docs/assets/css/'
			},
			main: {
				expand: true,
				flatten: true,
				src: [
					'test/css/main.css'
				],
				dest: 'docs/assets/css/'
			}
		},
		less: {
			min: {
				files : {
					'test/css/jquery.buttonUI.min.css' : [
						'src/less/button_ui.less'
					]
				},
				options : {
					compress: true,
					ieCompat: false
				}
			},
			max: {
				files : {
					'test/css/jquery.buttonUI.css' : [
						'src/less/button_ui.less'
					],
					'test/css/main.css' : [
						'src/less/main.less'
					]
				},
				options : {
					compress: false,
					ieCompat: false
				}
			},
		},
		usebanner: {
			javascript: {
				options: {
					position: 'top',
					banner: '<%= meta.banners %>',
					linebreak: true,
				},
				files: {
					src: [
						'docs/assets/js/jquery.buttonUI.js',
						'docs/assets/js/jquery.buttonUI.min.js',
						'docs/assets/css/jquery.buttonUI.css',
						'docs/assets/css/jquery.buttonUI.min.css'
					]
				}
			}
		},
		pug: {
			templates: {
				options: {
					pretty: '\t',
					separator:  '\n'
				},
				files: {
					"docs/index.html": [
						'src/pug/index.pug'
					]
				}
			}
		},
		copy: {
			javascript: {
				expand: true,
				cwd: 'src/js',
				src: [
					'jquery.buttonUI.js',
					'main.js'
				],
				dest: 'docs/assets/js/',
			},
			destJs: {
				expand: true,
				cwd: 'docs/assets/js',
				src: [
					'jquery.buttonUI.js',
					'jquery.buttonUI.min.js'
				],
				dest: 'dist/',
			},
			destCss: {
				expand: true,
				cwd: 'docs/assets/css',
				src: [
					'jquery.buttonUI.css',
					'jquery.buttonUI.min.css'
				],
				dest: 'dist/',
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			js: {
				files: [
					'src/js/*.*'
				],
				tasks: [
					'notify:watch',
					'jshint',
					'uglify',
					'copy:javascript',
					'usebanner',
					'notify:done'
				]
			},
			less: {
				files: [
					'src/less/*.*'
				],
				tasks: [
					'notify:watch',
					'less',
					'autoprefixer',
					'pug',
					'copy:destJs',
					'copy:destCss',
					'notify:done'
				]
			},
			pug: {
				files: [
					'src/pug/**/*.*'
				],
				tasks: [
					'notify:watch',
					'pug',
					'notify:done'
				]
			},
		},
		notify: {
			watch: {
				options: {
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: 'Запуск',
					image: __dirname+'\\src\\notify.png'
				}
			},
			done: {
				options: {
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: "Успешно Завершено",
					image: __dirname+'\\src\\notify.png'
				}
			}
		}
	};
	grunt.initConfig(config);
	grunt.registerTask('default',	[
		'notify:watch',
		'jshint',
		'uglify',
		'copy:javascript',
		'copy:destJs',
		'less',
		'autoprefixer',
		'pug',
		'copy:destCss',
		'usebanner',
		'notify:done'
	]);
	grunt.registerTask('dev',	[
		'watch'
	]);
}