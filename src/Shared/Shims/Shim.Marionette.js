define(function (require) {
	'use strict';

	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	// Override Marionette to use Precompiled Handlebars Templates
	Backbone.Marionette.Renderer.render = function (template, data) {
		return template(data);
	};

	return Backbone.Marionette;
});