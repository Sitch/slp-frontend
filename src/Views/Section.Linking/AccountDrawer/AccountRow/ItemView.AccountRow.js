define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');
	var StringUtils = require('stringUtils');

	var template = require('text!./Template.AccountRow.html');

	var AccountRowViewModel = Backbone.Model.extend({
		defaults: {
			status: "Establishing a Secure Connection...",
			fixNowStatus: false,
			connectedStatus: false,
			deleteStatus: false,
			progressStatus: false,
			initialProgressStatus: false,
			progressStep: false,
			speed: 1
		},
		initialize: function (model) {
			var counter = model.get('isRefreshing') ? 0 : 3;
			this.set({
				counter: counter,
				speed: Math.ceil(Math.random() * 3)
			});

			if(!counter) {
				// Deferred for improved responsiveness
				_.defer(_.bind(this.randomUpdate, this), counter);
			}
		},
		randomUpdate: function (counter) {
			var speed = this.get('speed');

			var base = 2000 * (counter + 1);
			var rand = Math.ceil(Math.random() * 5);
			var accel = 1000 / speed;

			var interval = Math.floor(base + (rand * accel));
			setTimeout(_.bind(this.incrementCounter, this), interval);
		},
		incrementCounter: function () {
			var counter = this.get('counter');
			if(counter < 3) {
				this.set('counter', counter + 1);
				this.randomUpdate(counter);
			}
		}
	});

	var AccountRow = Backbone.Marionette.ItemView.extend({
		template: template,
		className: "accountDrawer-row",
		statusText: ["Establishing a Secure Connection...", "Linking Accounts...", "Fetching Financial Data...", "Connecting..."],
		templateHelpers: function () {
			var counter = this.viewModel.get('counter');

			return _.extend({
				accountName: StringUtils.truncate(this.model.get('name'), 40),
				connectingComplete: counter === 3,
				status: this.statusText[counter] || '',
				firstDot: counter >= 0,
				secondDot: counter >= 1,
				thirdDot: counter >= 2,
				statusModel: this.viewModel.attributes,
				accountModel: this.model.attributes
			}, this.checkStatus());
		},
		initialize: function (options) {
			_.bindAll(this);

			this.options = options;

			this.viewModel = new AccountRowViewModel(this.model);

			this.bindTo(this.model, "change", this.render, this);
			this.bindTo(this.viewModel, "change", this.render, this);
		},
		checkStatus: function () {
			var isUAR = this.model.get('isUAR');
			var hasErrors = this.model.get('hasErrors');
			var isRefreshing = this.model.get('isRefreshing');

			return {
				fixNowStatus: hasErrors && isUAR,
				deleteStatus: hasErrors && !isUAR,
				connectedStatus: !hasErrors && !isRefreshing,
				progressStatus: !hasErrors && isRefreshing && this.endInitialProgress,
				initialProgressStatus: !hasErrors && isRefreshing && !this.endInitialProgress,
				progressStep: !hasErrors && isRefreshing
			};
		}
	});
	return AccountRow;
});