define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Task = require('./Task/ItemView.Task');

	var TaskGroup = Backbone.Marionette.CompositeView.extend({
		itemView: Task,
		itemViewContainer: '.task-list',
		template: Template.TaskGroup,
		events: {

		},
		initialize: function (options) {

		},
		templateHelpers: function () {
			return {
				// name: name,
			};
		}
	});
	return TaskGroup;
});