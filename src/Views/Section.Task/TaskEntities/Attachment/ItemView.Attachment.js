define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Attachment = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'attachment',
		template: Template.Attachment
	});
	return Attachment;
});