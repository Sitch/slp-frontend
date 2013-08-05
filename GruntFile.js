/*
 * Grunt Config
 *
 */
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		'pkg': grunt.file.readJSON('package.json'),
		'clean': {
			build: ['public/js/*', 'public/css/screen.min.css'],
			sass: ['.sass-cache']
		},
		// 'bower': {
		// 	dev: {
		// 		dest: 'public/components/'
		// 	}
		// },
		'compass': {
			dev: {
				config: 'config.rb',
				forcecompile: true
			}
		},
		'cssmin': {
			dist: {
				src: ['public/css/screen.css'],
				dest: 'public/css/screen.min.css'
			}
		},
		'handlebars': {
			compile: {
				options: {
					namespace: "JST"
				},
				files: {
					'public/js/templates.js': ['src/Templates/**/*.handlebars']
				}
			}
		},
		'requirejs': {
			prod: {
				options: {
					baseUrl: 'src',
					name: 'App.Bootloader',
					mainConfigFile: 'src/App.Bootloader.js',
					out: 'public/js/build.js',

					optimize: 'uglify2',
					generateSourceMaps: true,
					preserveLicenseComments: false,
					useSourceUrl: true,

					inlineText: false,
					findNestedDependencies: true,

					paths: {
						handlebars: "../public/components/handlebars/handlebars.runtime"
						// ,
						// templates: "public/js/templates"
					}
				}
			}
		}
	});
	// grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-compass');
	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-requirejs');

	grunt.registerTask('build', ['clean', 'compass:dev', 'cssmin', 'clean:sass', 'handlebars', 'requirejs']);
};