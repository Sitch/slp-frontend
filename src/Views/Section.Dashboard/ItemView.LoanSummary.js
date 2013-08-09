define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var LoanSummary = Backbone.Marionette.ItemView.extend({
		template: Template.LoanSummary,
		templateHelpers: function () {

			var loans = this.accounts.getAllLoans();
			return {
				total: this.accounts.calculateTotalBalance(),
				loans: loans
			};
		},
		initialize: function () {
			this.accounts = this.cache.get('accounts');
		}
	});
	return LoanSummary;
});