define(function (require) {
	'use strict';

	// DEPENDENCES
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	var DrawerModel = require('./Model.AccountDrawer');

	var template = require('text!./Template.StatusBar.html');

	return Backbone.Marionette.Layout.extend({
		template: template,
		events: {
			'click': 'toggleDrawer'
		},
		initialize: function (options) {
			_.bindAll(this);
			this.options = options;

			this.bindTo(App.vent, 'linkingFlow:toggleDrawer', this.toggleDrawer, this);
		},
		animation: function () {
			var isOpen = this.model.get('drawerOpen');
	    	this.drawerHeight = $("." + this.options.containEl).height() - 70;

			this.$el.toggleClass('open', isOpen);
			this.$el.closest('#account_drawer_mask').removeClass(isOpen ? "closed" : "open").animate({
				bottom: '0px',
				height: (isOpen ? this.drawerHeight : this.options.layoutOptions.drawerStartSize) + 'px'
			}, 'fast', function(){
				$(this).addClass(isOpen ? "open" : "closed");
			});

		},
		onShow: function () {
			this.animation();
		},
		toggleDrawer: function () {
			var currentValue = this.model.get('drawerOpen');

			this.model.set({
				drawerOpen: !currentValue,
				drawerHeight: this.drawerHeight
			});
			this.animation();
		}
	});
});