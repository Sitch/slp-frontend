define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var PathNotFound404View = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'invalid-path',
		template: Template.PathNotFound
	});
	return PathNotFound404View;
});