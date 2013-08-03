define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var SidebarAccount = require('./Task/ItemView.SidebarAccount');

	var Sidebar = Backbone.Marionette.CompositeView.extend({
		itemView: SidebarAccount,
		itemViewContainer: '.sidebar',
		template: Template.Sidebar,
		events: {

		},
		initialize: function (options) {

		},
		templateHelpers: function () {
			return {
				// name: name,
			};
		}
	});
	return Sidebar;
});