define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Footer = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'grey-bg full-width clearfix',
		template: Template.Footer
	});
	return Footer;
});