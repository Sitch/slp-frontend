define(function (require){
	'use strict';
	// DEPENDENCES
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	// TEMPLATES
	var Template = require('text!./Template.LoadingScreen.html');

	return Backbone.Marionette.Layout.extend({
	    template: Template,
	    initialize: function (options){
		    _.bindAll(this);
		    this.options = options;
	    },
	    onShow: function(){
	    }
	});
});