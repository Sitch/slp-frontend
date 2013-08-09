define(function (require){
	'use strict';
	// DEPENDENCES
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	// TEMPLATES
	var mainTpl = require('text!./Template.ErrorSuccess.html');
	var headerTpl = require('text!../LoadingView/Header/Template.ErrorSuccessHeader.html');

	var Loading = require("../LoadingView/View.Loading");

	return Loading.extend({
	    mainTpl: mainTpl,
	    headerTpl: headerTpl,
	    isError: true
	});
});
