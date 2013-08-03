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
	var Navigation = require('./Views/Navigation/ItemView.Navigation');
	var Sidebar = require('./Views/Sidebar/CompositeView.Sidebar');
	var Footer = require('./Views/Footer/ItemView.Footer');

	// Regions
	var Modal = require('./Shared/Regions/Region.Modal');
	var Notification = require('./Shared/Regions/Region.Notification');

	// ***** BEGIN APP ***** //
	var App = new Backbone.Marionette.Application();

	App.addRegions({

		// Main regions
		header: '#header',
		sidebar: '#sidebar',
		content: '#content',
		footer: '#footer',

		// Overlap regions
		modal: Modal,
		notification: Notification
	});

	App.addInitializer(function (options) {

		// Extend App with environment variables
		// _.extend(App, options);

		// Useful jQuery globals
		App.$window = $(window);
		App.$document = $(document);
		App.$body = $('html, body');

		// App Modules
		App.Cache = new Cache(_.extend(options.environment.cache, cacheMap));

		App.Analytics = new Analytics(options);
		App.GoogleAnalytics = new GoogleAnalytics(options);

		App.Router = new Router(options);

		// Extend cache functionality to all views
		Backbone.Marionette.View.prototype.cache = App.Cache;

		// Fetch the prerequisite server resources
		var user = App.Cache.get('user');
		var accounts = App.Cache.get('accounts');

		$.when(user.deferred, accounts.deferred).then(function () {
			
			// Show App Regions
			App.header.show(new Navigation(options));
			App.sidebar.show(new Sidebar(options));
			App.footer.show(new Footer(options));

			Backbone.history.start();
		});
	});
	return App;
});