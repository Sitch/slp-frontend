define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	var template = require('text!./Template.LoginHeader.html');

	return Backbone.Marionette.ItemView.extend({
		template: template,
		initialize: function (options) {
			_.bindAll(this);
			this.options = options;
			this.model = options.collection;
		}
	});
});