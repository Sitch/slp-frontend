define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Task = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		className: 'task-item',
		template: Template.Task,
		events: {
			
		},
		templateHelpers: function () {
			return {
				name: '',
				src: ''
			};
		},
		initialize: function (options) {

		}
	});
	return Task;
});