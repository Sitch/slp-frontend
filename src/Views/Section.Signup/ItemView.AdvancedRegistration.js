define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Syphon = require('backbone.syphon');

	var AdvancedRegistration = Backbone.Marionette.ItemView.extend({
		template: Template.AdvancedRegistration,
		events: {
			'click #complete-btn': 'complete',
			'click a': 'surpress'
		},
		initialize: function () {
			this.user = this.cache.get('user');
		},
		surpress: function (event) {
			event.stopPropagation();
			event.preventDefault();
		},
		displayErrors: function () {
			// var errors = this.user.getErrors();

			this.$('.alert').removeClass('hidden');
		},
		complete: function (event) {
			this.surpress(event);

			var self = this;
			this.user.set(Backbone.Syphon.serialize(this));

			if (this.user.hasErrors()) {
				this.displayErrors();
			} else {
				this.user.serverUpdate({
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
	return AdvancedRegistration;
});