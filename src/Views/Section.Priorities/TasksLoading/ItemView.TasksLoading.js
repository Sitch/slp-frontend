define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var TasksLoading = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'tasks-loading',
		template: Template.TasksLoading
	});
	return TasksLoading;
});