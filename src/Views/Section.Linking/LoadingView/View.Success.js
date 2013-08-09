define(function (require){
	'use strict';
	// DEPENDENCES
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	// TEMPLATES
	var mainTpl = require('text!./Main/Template.SuccessMain.html');

	var Loading = require("./View.Loading");

	return Loading.extend({
	    mainTpl: mainTpl,
	    isError: false
	});
});
