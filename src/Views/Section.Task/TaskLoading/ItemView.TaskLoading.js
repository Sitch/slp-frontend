define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var TaskLoading = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'task-loading',
		template: Template.TaskLoading
	});
	return TaskLoading;
});