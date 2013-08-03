define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Email = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'email',
		template: Template.Email
	});
	return Email;
});