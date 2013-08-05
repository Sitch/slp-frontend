define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var SignupForm = require('./ItemView.SignupForm');
	var SignupLoading = require('./SignupLoading/ItemView.SignupLoading');

	var SignupLayout = Backbone.Marionette.Layout.extend({
		template: Template.Signup,
		tagName: 'div',
		regions: {
			form: '#form-view'
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

				this.form.show(new SignupLoading());
			}

			$.when(data, schema).then(function () {
				self.form.show(new SignupForm());
			});
		}
	});
	return SignupLayout;
});