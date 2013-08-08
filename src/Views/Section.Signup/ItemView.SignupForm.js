define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Alpaca = require('alpaca');

	var SignupFormView = Backbone.Marionette.ItemView.extend({
		template: Template.SignupForm,
		initialize: function (options) {
			this.formData = this.cache.get('formData');
			this.formSchema = this.cache.get('formSchema');
		},
		displayForm: function () {
			$.alpaca(this.$('.well'), {
				view: 'VIEW_BOOTSTRAP_CREATE',
				// data: this.formData.get('data'),
				schema: this.formSchema.get('schema'),
				options: this.formSchema.get('options')
			});
		},
		onShow: function () {
			this.displayForm();
		}
	});
	return SignupFormView;
});