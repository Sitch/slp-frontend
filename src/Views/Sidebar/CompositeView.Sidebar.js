define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var SidebarAccount = require('./Account/ItemView.SidebarAccount');

	var Sidebar = Backbone.Marionette.CompositeView.extend({
		tagName: 'div',
		// className: '',
		itemView: SidebarAccount,
		// itemViewContainer: '.sidebar',
		template: Template.Sidebar,
		events: {

		},
		initialize: function (options) {
			this.collection = this.cache.get('accounts');
		},
		templateHelpers: function () {
			return {
				categories: ['Inbox', 'All Mail', 'Files', 'Notes', 'Search']
			};
		}
	});
	return Sidebar;
});