define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	// Modules
	var Analytics = require('./Shared/Analytics/App.Analytics');
	var GoogleAnalytics = require('./Shared/Analytics/App.GoogleAnalytics');
	var Cache = require('./Shared/Cache/App.Cache');
	var cacheMap = require('./ServerResources/Map.ServerResources');
	var Router = require('./App.Router');

	// Views
	var Header = require('./Views/Header/ItemView.Header');
	var Footer = require('./Views/Footer/ItemView.Footer');

	// Regions
	var Modal = require('./Shared/Regions/Region.Modal');
	var Notification = require('./Shared/Regions/Region.Notification');

	// ***** BEGIN APP ***** //
	var App = new Backbone.Marionette.Application();

	App.addRegions({

		// Main regions
		header: '#header',
		content: '#content',
		footer: '#footer',

		// Overlap regions
		modal: Modal,
		notification: Notification
	});

	App.addInitializer(function (env) {

		// Extend App with environment variables
		App.env = env;

		// Add global event binder
		_.extend(App, Backbone.Events);

		App.Erroring = {};
		App.Erroring.log = [];

		App.on('error:ajaxReadFail', function (state) {
			App.Erroring.log.push(state);
			App.trigger('error:ajaxReadFail:render');
			App.Router.navigate('ajaxReadFail', {
				trigger: true
			});
		});

		// Useful jQuery globals
		App.$window = $(window);
		App.$document = $(document);
		App.$body = $('html, body');

		// App Modules
		App.Cache = new Cache(_.extend(env.cache, cacheMap));

		// App.Analytics = new Analytics(env);
		App.GoogleAnalytics = new GoogleAnalytics(env.ga);

		App.Router = new Router();

		// Extend cache functionality to all views
		Backbone.Marionette.View.prototype.cache = App.Cache;

		// Fetch the prerequisite server resources
		// var user = App.Cache.get('user');
		// var accounts = App.Cache.get('accounts');
		// var formData = App.Cache.get('formData');
		// var formSchema = App.Cache.get('formSchema');

		// $.when(user.deferred, accounts.deferred).then(function () {

		// Show App Regions
		App.header.show(new Header());
		App.footer.show(new Footer());

		Backbone.history.start();
		// });
	});
	return App;
});