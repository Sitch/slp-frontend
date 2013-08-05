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
		// events: {

		// },
		// tagName: 'div',
		// className: 'row', 
		initialize: function (options) {
			this.formData = this.cache.get('formData');
			this.formSchema = this.cache.get('formSchema');
		},
		// templateHelpers: function () {
		// 	return {
		// 		// name: name,
		// 	};
		// },
		onShow: function () {

			// $("#signup-form").alpaca({
			// 	"view": "VIEW_JQUERYUI_CREATE",
			// 	"schema": {
			// 		"type": "object",
			// 		"properties": {
			// 			"name": {
			// 				"type": "string",
			// 				"required": true
			// 			},
			// 			"birthday": {
			// 				"type": "text",
			// 				"format": "date",
			// 				"required": true
			// 			},
			// 			"preference": {
			// 				"type": "text",
			// 				"enum": ["orlando", "tokyo", "amsterdam"],
			// 				"default": "orlando",
			// 				"required": true
			// 			}
			// 		}
			// 	},
			// 	"options": {
			// 		"renderForm": true,
			// 		"form": {
			// 			"buttons": {
			// 				"submit": {}
			// 			}
			// 		},
			// 		"fields": {
			// 			"name": {
			// 				"label": "Your Name"
			// 			},
			// 			"birthday": {
			// 				"label": "Your Birthday"
			// 			},
			// 			"preference": {
			// 				"label": "Your Destination",
			// 				"type": "select",
			// 				"optionLabels": ["Orlando, USA", "Tokyo, Japan", "Amsterdam, Netherlands"]
			// 			}
			// 		}
			// 	}
			// });

			$.alpaca(this.$("#signup-form"), {
				data: this.formData.attributes,
				schema: this.formSchema.attributes,
				options: this.formOptions.attributes
			});
		}
	});
	return SignupFormView;
});