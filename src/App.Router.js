 define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	// var Accounts = require('./Routes/Routes.Accounts');
	var dashboard = require('./Routes/Route.Dashboard');
	var errors = require('./Routes/Route.Errors');
	var login = require('./Routes/Route.Login');
	var marketing = require('./Routes/Route.marketing');
	var signup = require('./Routes/Route.Signup');

	var resourceMap = _.extend({}, dashboard.resources, signup.resources, login.resources, marketing.resources, errors.resources);

	// Section Model manages the state of the subnav section
	var sectionModel = new Backbone.Model();



	

	return Backbone.Marionette.AppRouter.extend({
		sectionModel: sectionModel,
		getState: function () {
			return sectionModel.get('state');
		},
		appRoutes: _.extend({
			// Default
			'': 'defaultRoute'

		}, dashboard.routes, signup.routes, login.routes, marketing.routes, errors.routes),
		controller: _.extend({
			defaultRoute: function () {
				App.Router.navigate('Dashboard', {
					trigger: true
				});
			},
			authRoute: function(route, params){
				var user = App.Cache.get('auth');

				if(user.isAuthorized()){
					route.call(this, params);
				} else {
					App.Router.navigate('Login', {
						trigger: true
					});
				}
			},
			triggerRoute: function (section, options) {
				var resource = resourceMap[section];

				sectionModel.set('state', section);

				App.content.show(new resource.constructor(options || {}));

				// Scroll the window to the top
				App.$body.animate({
					scrollTop: 0
				});
			},

			// trackPageView
			// Handles forwarding App.analytics and Google Analytics calls
			trackPageView: function (page) {

			}
		}, dashboard.controller, signup.controller, login.controller, marketing.controller, errors.controller)
	});
});