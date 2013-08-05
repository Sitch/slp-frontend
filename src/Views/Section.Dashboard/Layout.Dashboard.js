define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	// var Dashboard = require('./Dashboard/CollectionView.Dashboard');
	var DashboardLoading = require('./DashboardLoading/ItemView.DashboardLoading');

	var DashboardLayout = Backbone.Marionette.Layout.extend({
		template: Template.Dashboard,
		tagName: 'div',
		className: 'dashboard',
		regions: {
			content: '#dashboard'
		},
		initialize: function (options) {

			// debugger;
			// this.options = options || {};
			// this.tasks = this.cache.get('tasks');
			// this.accounts = this.cache.get('accounts');
		}
		// ,onShow: function () {
			// var self = this;
			// if (this.tasks.deferred.state() === 'pending') {
			// 	this.content.show(new DashboardLoading());
			// }
			// $.when(this.tasks.deferred).then(function () {
			// 	self.content.show(new Tasks(this.options));
			// });
		// }
	});
	return DashboardLayout;
});