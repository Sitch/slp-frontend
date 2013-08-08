define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Syphon = require('backbone.syphon');

	var AuthModel = require('ServerResources/Model.Auth');

	var Login = Backbone.Marionette.ItemView.extend({
		template: Template.Login,
		events: {
			'click #login-btn': 'login',
			'click a': 'surpress'
		},
		initialize: function () {
			this.auth = this.cache.get('auth');
		},
		surpress: function(event){
			event.stopPropagation();
			event.preventDefault();
		},
		login: function (event) {
			this.surpress(event);

			var self = this;
			this.auth.set(Backbone.Syphon.serialize(this));
			this.auth.serverCreate({
				error: function () {
					self.$('.alert').removeClass('hidden');
				},
				success: function () {
					self.auth.setSession();
					App.Router.navigate('Dashboard', {
						trigger: true
					});
				}
			});
		}
	});
	return Login;
});