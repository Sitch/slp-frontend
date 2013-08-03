define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var EmptyTaskGroup = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'empty-task-group',
		template: Template.EmptyTaskGroup
	});
	return EmptyTaskGroup;
});