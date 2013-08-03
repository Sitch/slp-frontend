define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Evernote = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'evernote',
		template: Template.Evernote
	});
	return Evernote;
});