define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	// var Accounts = require('./Routes/Routes.Accounts');
	var dashboard = require('./Routes/Route.Dashboard');
	var errors = require('./Routes/Route.Errors');
	// var People = require('./Routes/Route.People');
	// var tasks = require('./Routes/Route.Tasks');
	var signup = require('./Routes/Route.Signup');

	// Map the Sections resources:
	// 1) View Constructor
	// 2) Trigger name
	// 3) Subnav button id
	// var resourceMap = _.extend({}, Accounts.resources, Browse.resources, Errors.resources, People.resources, Tasks.resources);
	var resourceMap = _.extend({}, dashboard.resources, signup.resources, errors.resources);

	// Section Model manages the state of the subnav section
	var sectionModel = new Backbone.Model();

	return Backbone.Marionette.AppRouter.extend({
		sectionModel: sectionModel,
		getState: function () {
			return sectionModel.get('state');
		},
		// // forceRoute
		// // This triggers a forced route by appending a '?' to fool the App.Router into thinking a route change has
		// // happened.
		// forceRoute: function(route) {
		// 	if(App.modal.isOpen()) return;
		// 	sectionModel.set('forced', true);
		// 	App.Router.navigate(route + '?', {
		// 		trigger: true
		// 	});
		// 	App.Router.navigate(route, {
		// 		trigger: true
		// 	});
		// 	sectionModel.set('forced', false);
		// },
		appRoutes: _.extend({
			// Default
			'': 'defaultRoute'

		}, dashboard.routes, signup.routes, errors.routes),
		controller: _.extend({
			defaultRoute: function () {
				App.Router.navigate('Dashboard', {
					trigger: true
				});
			},
			triggerRoute: function (section, options) {
				var resource = resourceMap[section];
				// if ((sectionModel.get('state') !== section) /* || sectionModel.get('forced') */ ) {
				// Trigger the subnav button highlight
				// App.vent.trigger('subnav:select', resource.button);
				// set section model to new section

				// App.Router.navigate(section, {
				// 	trigger: true
				// });

				sectionModel.set('state', section);
				App.content.show(new resource.constructor(options || {}));
				// }
				// Trigger the view's instantiation
				// if (options) {
				// var sectionTrigger = resource.trigger;
				// var trigger = _.flatten(_.compact([sectionTrigger, subsections])).join(':');
				// App.vent.trigger(trigger, param || null);
				// }
				/** 
				 * scroll the window to the top
				 */
				App.$body.animate({
					scrollTop: 0
				});
			},

			// trackPageView
			// Handles forwarding App.analytics and Google Analytics calls
			trackPageView: function (page) {

			}
		}, dashboard.controller, signup.controller, errors.controller)
	});
});