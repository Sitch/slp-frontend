define(function (require){
	'use strict';
	// DEPENDENCES
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	// TEMPLATES
	var Template = require('text!./Template.LoginHeader.html');

	return Backbone.Marionette.ItemView.extend({
	    template: Template,
	    initialize: function (options){
		    _.bindAll(this);
		    this.options = options;
		    this.model = options.model;
	    }
	});
});
