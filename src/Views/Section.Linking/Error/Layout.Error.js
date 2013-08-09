define(function (require) {
	'use strict';

	// DEPENDENCES
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');
	var Syphon = require('syphon');

	var template = require('text!./Template.Error.html');

	//VIEWS
	var LoginHeader = require('./Header/View.LoginHeader');
	var LoginForm = require('./Form/View.LoginForm');

	//COLLECTION
	var FormCollection = require('../../Collections/Collection.SitesForm');

	var SitesFix = require('../../Models/Model.SiteFix');

	Handlebars.registerHelper('foreach', function (arr, options) {
		if(options.inverse && !arr.length) {
			return options.inverse(this);
		}

		var ssnArray = ['SSN', 'Social Security Number', 'Social Security', 'SS', 'Social', 'S/N'];

		//Check for SSN Fields
		$.each(arr, function (i, item) {
			if(item.inputs) {
				if($.inArray(item.displayName, ssnArray) >= 0 && item.inputs.length >= 3) {
					item.inputs[0].size = 3;
					item.inputs[1].size = 2;
					item.inputs[2].size = 4;
					item.inputs[2].last = true;
				}
			}
		});

		return arr.map(function (item, index) {
			item.$index = index;
			item.$first = index === 0;
			item.$last = index === arr.length - 1;
			return options.fn(item);
		}).join('');
	});

	return Backbone.Marionette.Layout.extend({
		template: template,
		triggers: {
			'submit #errorForm': '_track:click:linking:submitLoginForm',
			'click #linking-goBack': 'goBack'
		},
		regions: {
			header: '#errorHeader_container',
			form: '#errorForm_container'
		},
		initialize: function (options) {
			_.bindAll(this);
			this.options = options;
			this.fsm = this.options.stateMachine;

			this.collection = this.fsm.sitesFix;

			this.bindTo(this, '_track:click:linking:submitLoginForm', this.postFormData, this);
			this.bindTo(this, 'goBack', this.goBack, this);
		},
		onShow: function () {
			this.displayLoginForm();
		},
		goBack: function (e) {
			e.preventDefault();
			this.fsm.goToInitial();
		},
		displayLoginForm: function () {
			this.header.show(new LoginHeader({
				collection: this.collection
			}));
			this.form.show(new LoginForm({
				collection: this.collection
			}));
		},
		postFormData: function (e) {
			e.preventDefault();

			if(this.$("#connectAccount").hasClass("trans_btn"))return;

			var formData = Backbone.Syphon.serialize(this);
			var cleanedData = {};

			//Make sure form values are wrapped in an array
			$.each(formData, function (i, data) {
				cleanedData[i] = [data];
			});

			this.fsm.postErrorForm({
				'siteId': this.collection.get('siteId'),
				'runId': this.collection.get('runId'),
				'handlerType': this.collection.get('handlerType'),
				'handlerFormType': this.collection.get('handlerFormType'),
				'formKey': this.collection.get('handlerForm').key,
				'contentServiceId': this.collection.get('handlerForm').contentServiceId,
				'values': cleanedData
			});
		}
	});
});