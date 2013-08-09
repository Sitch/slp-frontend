define(function (require) {
	'use strict';
	// DEPENDENCIES
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		Handlebars = require('handlebars'),
		NiceIt = require('niceit');

	var InputFiltering = require('inputFiltering'),
		Utils = require('utils');

	var template = require('text!./Template.AddManualAccount.html');

	return Backbone.Marionette.ItemView.extend({
		template: template,
		idName: "addManualAccount",
		triggers: {
			"click #selectFormToggle": "show:accountTypes:dropdown",
			"click .selectForm-dropdown-listItem": "select:accountType",
			"click #goBackToSearch": "goBackToSearch",
			"blur #addManual-balance": "formatCurrency",
			"click #linking-addManualAccount-enter.green_btn": "_track:click:linking:addManualAccount",
			"keyup #addManual-name": "checkValidation",
			"keydown #addManual-name": "preventNumbers"
		},
		initialize: function (options) {
			_.bindAll(this);
			this.options = options;

			this.bindTo(this, "show:accountTypes:dropdown", this.showDropdown, this);
			this.bindTo(this, "select:accountType", this.selectAccountType, this);
			this.bindTo(this, "goBackToSearch", this.goBackToSearch, this);
			this.bindTo(this, "formatCurrency", this.formatCurrency, this);
			this.bindTo(this, "_track:click:linking:addManualAccount", this.postAccount, this);
			this.bindTo(this, "checkValidation", this.checkValidation, this);
			this.bindTo(this, "preventNumbers", this.preventNumbers, this);
		},
		onShow: function () {
			this.$('#choose_account_type').NiceIt();
		},
		preventNumbers: function (e) {
			//PREVENTS INPUT OF NUMBERS
			if (e.keyCode >= 48 && e.keyCode <= 57) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
		},
		checkValidation: function (e) {
			//MORE THAN 3 CHARS, ENABLE BUTTON
			if ($(e.currentTarget).val().length >= 3) {
				$("#linking-addManualAccount-enter").removeClass("disabled").addClass("green_btn");
			} else if ($(e.currentTarget).val().length < 3) {
				$("#linking-addManualAccount-enter").removeClass("green_btn").addClass("disabled");
			}

		},
		formatCurrency: function (e) {
			var val = $(e.currentTarget).val().replace(/[^\d.]/g, ''),
				formatted = Utils.formatCurrency(val, false, false, true);
			$(e.currentTarget).val(formatted);
		},
		goBackToSearch: function (e) {
			e.preventDefault();
			e.stopPropagation();

			this.options.stateMachine.goToInitial();
		},
		postAccount: function () {
			var accountType = $("#addManual-containerType").val(),
				assetType = $('#addManualAccount-radioButtons input.radioInput:checked').val(),
				currentBalance = $("#addManual-balance").val().replace(/,/g, ""),
				jsonPost = {};

			if (currentBalance.charAt(0) === "-") currentBalance = currentBalance.substring(1);
			jsonPost['isAsset'] == false;

			jsonPost = {
				"accountName": $("#addManual-name").val(),
				"currentBalance": currentBalance || 0,
				"accountType": accountType
			};

			if (accountType == "other") {
				jsonPost['isAsset'] = assetType === "Asset" ? true : false;
			}

			this.options.stateMachine.postManualAccount(jsonPost);
		},
		showDropdown: function () {
			var dropdown = $("#addManualAccount-selectForm-dropdown");

			if (dropdown.is(":visible")) {
				dropdown.fadeOut("fast");
				$("#selectFormToggle").removeClass("activeToggle");
			} else {
				dropdown.fadeIn("fast");
				$("#selectFormToggle").addClass("activeToggle");
			}
		},
		selectAccountType: function (e) {
			var account = $(e.currentTarget).html();
			var type = $(e.currentTarget).data("type");
			var radioButtons = $("#addManualAccount-radioButtons");

			if (type === "other") {
				radioButtons.fadeIn(500);
			} else {
				if (radioButtons.is(":visible")) radioButtons.fadeOut(500);
			}

			//ACTIONS = Fill Select Inout with text
			//          Fill hidden input with text
			//          Trigger Click on toggle button
			$("#addManualAccount-selectForm span.selectFormText").html(account);
			$("#addManual-containerType").val(type);
			$("#selectFormToggle").trigger("click");

		}
	});
});