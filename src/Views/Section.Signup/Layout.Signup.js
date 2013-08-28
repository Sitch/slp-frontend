define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var SignupLoading = require('./SignupLoading/ItemView.SignupLoading');

	var BasicRegistration = require('./ItemView.BasicRegistration');
	var SignupRegistration = require('./ItemView.SignupForm');
	var AdvancedRegistration = require('./ItemView.AdvancedRegistration');


	var StateModel = Backbone.Model.extend({
		state: 'basic'
	});

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

			this.model = new StateModel();
			this.on(this.model, 'change:state', this.onStateChange, this);
		},
		constructorMap: {
			'basic': BasicRegistration,
			'signup': SignupRegistration,
			'advanced': AdvancedRegistration
		},
		onStateChange: function(){
			var state = this.model.get('state');
			var Constructor = this.constructorMap[state]

			if(this.constructors.hasOwnProperty(state)){
				this.section.show(new Constructor());
			}

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
				self.section2.show(new SignupRegistration());
				self.section3.show(new AdvancedRegistration());
			});
		}
	});
	return SignupLayout;
});