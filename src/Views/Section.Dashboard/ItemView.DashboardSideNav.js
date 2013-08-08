define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Sidenav = Backbone.Marionette.ItemView.extend({
		template: Template.DashboardSidenav,
	});
	return Sidenav;
});