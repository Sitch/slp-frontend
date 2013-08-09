define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	var scroll = require('scroll');

	var AccountRow = require('./AccountRow/ItemView.AccountRow');

	var template = require('text!./Template.Drawer.html');

	return Backbone.Marionette.CompositeView.extend({
		template: template,
		itemView: AccountRow,
		id: "account_drawer_inner",
		className: "nonScroll",
		triggers: {
			"click .linking-fixAccount": "_track:click:linking:fixAccount",
			"click .linking-tryAgainAccount": "_track:click:linking:tryAgainAccount"
		},
		initialize: function (options) {
			_.bindAll(this);
			this.options = options;
			this.fsm = this.options.stateMachine;
			this.collection = App.LinkManager.sitesRefresh;

			this.collection.serverRead();

			this.bindTo(this, "_track:click:linking:fixAccount", this.fixAccount, this);
			this.bindTo(this, "_track:click:linking:tryAgainAccount", this.tryAgainAccount, this);
			this.bindTo(this.collection, "reset", this.checkStatus, this);
		},
		initialEvents: function () {
			this.bindTo(this.collection, "add", this.addChildView, this);
			this.bindTo(this.collection, "remove", this.removeItemView, this);
		},
		tryAgainAccount: function (e) {
			var id = $(e.currentTarget).data("site");
			var name = $(e.currentTarget).data("name");

			App.vent.trigger("linkingFlow:toggleDrawer");

			this.fsm.state.set("current", "noActionError");
			this.fsm.getError(id, name);
		},
		fixAccount: function (e) {
			var id = $(e.currentTarget).data("site");

			App.vent.trigger("linkingFlow:toggleDrawer");

			this.fsm.state.set("current", "errorFlow");
			this.fsm.getError(id);
		},
		appendHtml: function (collectionView, itemView) {
			collectionView.$el.prepend(itemView.el);
		},
		onRender: function () {
			this.scrollify();
			this.checkStatus();
		},
		checkStatus: function () {
			this.manageErrorTooltip();

			if(this.collection.length >= 3){
				this.$el.removeClass("nonScroll").addClass("scroll");
			}else{
				this.$el.removeClass("scroll").addClass("nonScroll");
			}

			//Manage the state of the Connecting Status Bar style
			var el = $("#connectingStatusBar");
			if(this.collection.isAllRefreshed()) {
				if(el.hasClass("refreshing")){
					el.addClass("notRefreshing").removeClass("refreshing");
					el.find(".statusBar-text").html("Connected Accounts");
				}
			} else {
				if(el.hasClass("notRefreshing")){
					el.addClass("refreshing").removeClass("notRefreshing");
					el.find(".statusBar-text").html("Connecting Accounts");
				}
			}
		},
		manageErrorTooltip: function () {
			//IF THE COLLECTION HAS ERRORS, AND HAS MORE THAN WHEN THE MODAL WAS OPENED
			if(this.collection.hasErrors() && this.collection.numOfErrors() > App.LinkManager.numOfErrors) {
				if(!this.$("#linking-errorTooltip").is(":visible")) {
					//Update the global number
					App.LinkManager.numOfErrors = this.collection.numOfErrors();

					$("#linking-errorTooltip").fadeIn();

					var name = _.find(this.collection.models.reverse(), function(site){ return site.get("hasErrors") == true; });
						name = name.get("name");

					if(name.length >= 27) name = name.substring(0, 27) + "...";
					$("#errorTooltip-number").html(name);
				}
			} else {
				if(this.$("#linking-errorTooltip").is(":visible")) {
					$("#linking-errorTooltip").fadeOut();
				}
			}

		},
		scrollify: function () {
			if(this.collection.length >= 9) {



				var that = this;
				_.defer(function () {
					$("#account_drawer").slimScroll({
						distance: '6px',
						size: '7px',
						color: '#444',
						railVisible: false,
						alwaysVisible: true,

						height: ($('.' + that.options.containEl).height() - 93) + 'px',
						subtractBarHeight: 10
					});
				});

			}
		}
	});
});