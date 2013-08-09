define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Syphon = require('backbone.syphon');

	var BasicRegistration = Backbone.Marionette.ItemView.extend({
		template: Template.BasicRegistration,
		events: {
			'click #signup-btn': 'submits',
			'click a.close': 'surpress'
		},
		initialize: function () {
			this.user = this.cache.prepare('user');
		},
		surpress: function (event) {
			event.stopPropagation();
			event.preventDefault();
		},
		displayErrors: function () {
			// var errors = this.user.getErrors();

			this.$('.alert').removeClass('hidden');
		},
		submit: function (event) {
			this.surpress(event);

			var self = this;
			this.user.set(Backbone.Syphon.serialize(this));

			if (this.user.hasErrors()) {
				this.displayErrors();
			} else {
				this.user.serverCreate({
					error: function () {
						self.displayErrors();
					},
					success: function () {
						App.Router.navigate('Dashboard', {
							trigger: true
						});
					}
				});
			}
		}
	});
	return BasicRegistration;
});