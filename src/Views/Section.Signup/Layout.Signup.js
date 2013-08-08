define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var SignupForm = require('./ItemView.SignupForm');
	var BasicRegistration = require('./ItemView.BasicRegistration');
	var AdvancedRegistration = require('./ItemView.AdvancedRegistration');
	var SignupLoading = require('./SignupLoading/ItemView.SignupLoading');

	var SignupLayout = Backbone.Marionette.Layout.extend({
		template: Template.Signup,
		tagName: 'div',
		regions: {
			section1: '#section1',
			section2: '#section2',
			section3: '#section3'
		},
		initialize: function (options) {
			this.formData = this.cache.get('formData');
			this.formSchema = this.cache.get('formSchema');
		},
		onShow: function () {

			var self = this;
			var data = this.formData.deferred;
			var schema = this.formSchema.deferred;

			if (data.state() === 'pending' ||
				schema.state() === 'pending') {

				this.section1.show(new SignupLoading());
			}

			$.when(data, schema).then(function () {
				self.section1.show(new BasicRegistration());
				self.section2.show(new SignupForm());
				self.section3.show(new AdvancedRegistration());
			});
		}
	});
	return SignupLayout;
});