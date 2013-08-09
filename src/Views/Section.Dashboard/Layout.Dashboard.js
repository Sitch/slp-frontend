define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var LoanSummary = require('./ItemView.LoanSummary');
	var LoanCalculator = require('../Charts/ItemView.LoanCalculator');
	var DashboardSidenav = require('./ItemView.DashboardSidenav');
	var DashboardLoading = require('./DashboardLoading/ItemView.DashboardLoading');

	var DashboardLayout = Backbone.Marionette.Layout.extend({
		template: Template.Dashboard,
		tagName: 'div',
		className: 'dashboard',
		regions: {
			left: '#dash-left',
			middle: '#dash-middle',
			// right: '#dash-right'
			info: '#info'
		},
		initialize: function (options) {
			this.accounts = this.cache.get('accounts');
		},
		onShow: function () {
			var self = this;
			var accounts = this.accounts.deferred;

			if (accounts.state() === 'pending') {
				this.middle.show(new DashboardLoading());
			}
			$.when(accounts).then(function () {
				self.left.show(new DashboardSidenav());
				self.middle.show(new LoanCalculator());
				self.info.show(new LoanSummary());
			});
		}
	});
	return DashboardLayout;
});