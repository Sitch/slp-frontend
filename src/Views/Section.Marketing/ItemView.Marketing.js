define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Marketing = Backbone.Marionette.ItemView.extend({
		template: Template.Marketing,
	});
	return Marketing;
});