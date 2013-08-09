define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Sidenav = Backbone.Marionette.ItemView.extend({
		template: Template.DashboardSidenav,
		templateHelpers: function () {
			return {
				loans: this.accounts.getAllLoans()
			};
		},
		initialize: function () {
			this.accounts = this.cache.get('accounts');
		}
	});
	return Sidenav;
});