define(function (require) {
	'use strict';
	// DEPENDENCES
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	var scroll = require('scroll');

	var errorMessages = require('../errorMessages');

	var template = require('text!./Template.LoginForm.html');

	Handlebars.registerHelper('equal', function (lvalue, rvalue, options) {
		if(arguments.length < 3) throw new Error("Handlebars Helper equal needs 2 parameters");
		if(lvalue != rvalue) {
			return options.inverse(this);
		} else {
			return options.fn(this);
		}
	});

	return Backbone.Marionette.ItemView.extend({
		template: template,
		idName: "loginForm_inner",
		triggers: {
			"keyup input": "input:keyup",
			"focus input": "input:focus",
			"blur input": "input:blur",
			"click .placeholderText": "click:placeholderText"
		},
		templateHelpers: function(){
			var errorCode = this.options.collection.get("errorCode"),
				message = errorMessages[errorCode].replace("{0}", "<b>" + this.options.collection.get("siteName") + "</b>"),
				message = message.replace("{2}", "<a id=\"goToManualAccount\">Manually Add Account</a>");

			return {
				"errorMessage": message
			};
		},
		initialize: function (options) {
			_.bindAll(this);
			this.options = options;
			this.model = new Backbone.Model(options.collection.get("handlerForm"));

			if(options.collection.get("handlerFormType") === "MFA") this.model.set("isMFA", true);

			//Toggles the connect button (After all required fields are entered)
			this.bindTo(this, "input:keyup", this.checkRequiredFields, this);
			this.bindTo(this, "input:blur", this.checkPlaceholderText, this);
			this.bindTo(this, "input:focus", this.removePlaceholderFromInput, this);
			this.bindTo(this, "click:placeholderText", this.removePlaceholderFromSpan, this);

		},
		onShow: function () {
			if(!this.model.get("isMFA")) {
				this.requiredFields = this.model.get("forms")[0].requiredFields;
				this.oneOfCollections = this.model.get("forms")[0].oneOfCollection;

				// //If there are oneOfCollection inputs AND more than 1 requiredField
				// //OR the number of requiredFields is greater than 4
				if((this.oneOfCollections.length && this.requiredFields.length > 1) || (this.requiredFields.length > 4)) {

					this.showShadows();

					// Initiate scrolling div
					this.$el.find("#loginForm_offset").slimScroll({
						distance: '15px',
						size: '8px',
						color: '#859BA8',
						railColor: '#97A8B2',
						railVisible: true,
						alwaysVisible: true,
						height: '220px'
					});
				}
			}
		},
		removePlaceholderFromSpan: function (e) {
			$(e.currentTarget).stop().fadeOut();
			$('input[name="' + e.currentTarget.id + '"]').focus();
		},
		removePlaceholderFromInput: function (e) {
			this.getNameParam(e);
			$("#" + this.paramName).stop().fadeOut();
		},
		toggleConnectButton: function (inputsLeft) {
			var connectButton = $("#connectAccount"),
				isGreen = connectButton.hasClass("green_btn"),
				isTrans = connectButton.hasClass("trans_btn");

			if(inputsLeft) {
				if(isGreen) connectButton.removeClass("green_btn").addClass("trans_btn");
			} else {
				if(isTrans) connectButton.removeClass("trans_btn").addClass("green_btn");
			}
		},
		getNameParam: function (e) {
			var that = this;
			this.paramName = "";

			$.each(e.currentTarget.attributes, function (i, item) {
				if(item.nodeName == "name") that.paramName = item.nodeValue;
			});
		},
		checkPlaceholderText: function (e) {
			if(e.currentTarget.value == "") {
				this.getNameParam(e);
				$("#" + this.paramName).stop().fadeIn();
			}
		},
		checkRequiredFields: function (e) {
			this.requiredFields = this.$el.find("input[data-required=true]").filter(function () {
				return $(this).val() == '';
			});
			this.toggleConnectButton(this.requiredFields.length);
		},
		showShadows: function () {
			$("#top_shadow, #bottom_shadow").fadeIn();
		}
	});
});