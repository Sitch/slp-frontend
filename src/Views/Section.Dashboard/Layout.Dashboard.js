define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var LoanCalculator = require('../Charts/ItemView.LoanCalculator');
	var DashboardSidenav = require('./ItemView.DashboardSidenav');
	var DashboardLoading = require('./DashboardLoading/ItemView.DashboardLoading');

	var DashboardLayout = Backbone.Marionette.Layout.extend({
		template: Template.Dashboard,
		tagName: 'div',
		className: 'dashboard',
		regions: {
			left: '#dash-left',
			middle: '#dash-middle'
			// right: '#dash-right'
		},
		initialize: function (options) {

			// this.options = options || {};
			// this.tasks = this.cache.get('tasks');
			// this.accounts = this.cache.get('accounts');
		},
		onShow: function () {

			this.left.show(new DashboardSidenav());

			this.middle.show(new LoanCalculator());
			

			// var self = this;
			// if (this.tasks.deferred.state() === 'pending') {
			// 	this.content.show(new DashboardLoading());
			// }
			// $.when(this.tasks.deferred).then(function () {
			// 	self.content.show(new Tasks(this.options));
			// });
		}
	});
	return DashboardLayout;
});