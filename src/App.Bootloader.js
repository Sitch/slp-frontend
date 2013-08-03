(function (global, undefined) {
	'use strict';

	require.config({
		waitSeconds: 20,
		paths: {

			// Core Libraries
			jquery: '../components/jquery/jquery',
			underscore: '../components/lodash/lodash',
			backbone: '../components/backbone/backbone',
			marionette: '../components/marionette/lib/backbone.marionette',
			handlebars: '../components/handlebars/handlebars',
			text: '../components/requirejs-text/text',
			debug: '../libs/javascript-debug-master/ba-debug',
			// d3: '../components/d3/d3',

			// backboneInclude: '../components/backbone.include/backbone.include.min',
			// backboneChoosen: '../components/backbone.chosen/backbone.chosen.min',

			// jQuery-ui
			// 'jqueryui/accordion': '../components/jquery-ui/ui/jquery.ui.accordion',
			// 'jqueryui/autocomplete': '../components/jquery-ui/ui/jquery.ui.autocomplete',
			// 'jqueryui/button': '../components/jquery-ui/ui/jquery.ui.button',
			// 'jqueryui/core': '../components/jquery-ui/ui/jquery.ui.core',
			// 'jqueryui/datepicker': '../components/jquery-ui/ui/jquery.ui.datepicker',
			// 'jqueryui/dialog': '../components/jquery-ui/ui/jquery.ui.dialog',
			// 'jqueryui/draggable': '../components/jquery-ui/ui/jquery.ui.draggable',
			// 'jqueryui/droppable': '../components/jquery-ui/ui/jquery.ui.droppable',
			// 'jqueryui/mouse': '../components/jquery-ui/ui/jquery.ui.mouse',
			// 'jqueryui/position': '../components/jquery-ui/ui/jquery.ui.position',
			// 'jqueryui/progressbar': '../components/jquery-ui/ui/jquery.ui.progressbar',
			// 'jqueryui/resizable': '../components/jquery-ui/ui/jquery.ui.resizable',
			// 'jqueryui/selectable': '../components/jquery-ui/ui/jquery.ui.selectable',
			// 'jqueryui/slider': '../components/jquery-ui/ui/jquery.ui.slider',
			// 'jqueryui/sortable': '../components/jquery-ui/ui/jquery.ui.sortable',
			// 'jqueryui/tabs': '../components/jquery-ui/ui/jquery.ui.tabs',
			// 'jqueryui/widget': '../components/jquery-ui/ui/jquery.ui.widget',

			cookie: '../components/jquery.cookie/jquery.cookie',

			// Shims
			// backboneShim: './Shared/Shims/Shim.Backbone',
			marionetteShim: './Shared/Shims/Shim.Marionette',
			hbars: './Shared/Shims/Shim.Handlebars',

			// Internal
			error: './Shared/Utils/ErrorInstance',
			// dateUtils: './Shared/Utils/DateUtils',
			// numberUtils: './Shared/Utils/NumberUtils',
			// stringUtils: './Shared/Utils/StringUtils',

			// User Libraries
			locale: './Locale/Locale.ENG'

		},
		shim: {
			jquery: {
				exports: 'jQuery'
			},
			underscore: {
				exports: '_'
			},
			marionette: {
				deps: ['jquery', 'underscore', 'backbone'],
				exports: 'Marionette'
			},
			backbone: {
				deps: ['underscore', 'jquery'],
				exports: 'Backbone'
			},
			// backboneInclude: {
			// 	deps: ['backbone']
			// },
			handlebars: {
				exports: 'Handlebars'
			},
			// easing: {
			// 	deps: ['jquery']
			// },
			// d3: {
			// 	exports: 'd3'
			// },
			cookie: {
				deps: ['jquery']
			}
		}
	});

	// This needs to be outside the below require because it sets a require.config for urlArgs when cache is disabled
	var ENVIRONMENT = {};
	require(['./App.Environment', 'environment'], function (setEnvironment, environment) {
		ENVIRONMENT = setEnvironment(environment, global);
	});

	require(['jquery', './App', './Shared/App.Erroring', /*'backboneInclude', /*'backboneChoosen',*/ 'marionetteShim'], function ($, App, Erroring) {
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