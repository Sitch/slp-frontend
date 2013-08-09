(function (global, undefined) {
	'use strict';

	require.config({
		waitSeconds: 20,
		paths: {

			// Core Libraries
			jquery: '../public/components/jquery/jquery',
			'jquery-ui': '../public/components/jquery-ui/ui/jquery-ui',
			'jquery-tmpl': '../public/components/jquery-tmpl/jquery.tmpl',
			'jquery.sticky': '../public/components/jquery.sticky/jquery.sticky',
			'jquery.cookie': '../public/components/jquery.cookie/jquery.cookie',
			// 'jquery-easing': '../public/components/jquery-easing/jquery.easing',
			underscore: '../public/components/lodash/lodash',
			handlebars: '../public/components/handlebars/handlebars',
			backbone: '../public/components/backbone/backbone',
			'backbone.syphon': '../public/components/backbone.syphon/lib/amd/backbone.syphon',
			marionette: '../public/components/marionette/lib/backbone.marionette',
			text: '../public/components/requirejs-text/text',
			debug: '../public/libs/javascript-debug-master/ba-debug',
			alpaca: '../public/libs/alpaca/alpaca.min',
			d3: '../public/components/d3/d3',
			nvd3: '../public/components/nvd3/nv.d3',
			moment: '../public/components/moment/moment',
			// 'underscore.string': '../public/components/underscore.string/underscore.string',

			// Shims
			marionetteShim: './Shared/Shims/Shim.Marionette',
			hbars: './Shared/Shims/Shim.Handlebars',

			// Internal
			error: './Shared/Utils/ErrorInstance',

			// Locale
			locale: './Locale/Locale.ENG'

		},
		shim: {
			jquery: {
				exports: 'jQuery'
			},
			underscore: {
				exports: '_'
			},
			handlebars: {
				exports: 'Handlebars'
			},
			backbone: {
				deps: ['underscore', 'jquery'],
				exports: 'Backbone'
			},
			marionette: {
				deps: ['jquery', 'underscore', 'backbone'],
				exports: 'Marionette'
			},
			'jquery.cookie': {
				deps: ['jquery']
			},
			'jquery.sticky': {
				deps: ['jquery']
			},
			alpaca: {
				deps: ['jquery']
			},
			d3: {
				exports: 'd3'
			},
			nvd3: {
				deps: ['d3'],
				exports: 'nv'
			}
			// alpaca: {
			// 	deps: ['jquery']
			// },
			// easing: {
			// 	deps: ['jquery']
			// },
			// d3: {
			// 	exports: 'd3'
			// },
		}
	});

	// This needs to be outside the below require because it sets a require.config for urlArgs when cache is disabled
	var ENVIRONMENT = {};
	require(['./App.Environment', './Config/local'], function (setEnvironment, environment) {
		ENVIRONMENT = setEnvironment(environment, global);
	});

	require(['jquery', './App', './Shared/App.Erroring', 'marionetteShim'], function ($, App, Erroring) {
		$(function () {
			try {
				global.App = App;
				global.App.start(ENVIRONMENT);
				// App.Erroring = new Erroring(ENVIRONMENT);
			} catch (error) {
				//App.Erroring.tryCatch(error);
			}
		});
	});
}(window));