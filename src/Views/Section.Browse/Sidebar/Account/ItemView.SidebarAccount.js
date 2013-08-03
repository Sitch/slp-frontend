define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var SidebarAccount = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'sidebar-account',
		template: Template.SidebarAccount,
		events: {
			
		},
		templateHelpers: function () {
			return {
				name: ''
			};
		},
		initialize: function (options) {

		}
	});
	return SidebarAccount;
});