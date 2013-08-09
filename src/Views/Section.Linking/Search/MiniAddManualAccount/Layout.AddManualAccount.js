define(function (require){
	'use strict';
	// DEPENDENCES
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');
	var	InputFiltering = require('inputFiltering');
	var utils = require('utils');

	// TEMPLATES
	var Template = require('text!./Template.AddManualAccount.html');

	return Backbone.Marionette.ItemView.extend({
	    template: Template,
	    idName: "addManualAccount",
	    triggers: {
	    	"click #selectFormToggle": "show:accountTypes:dropdown",
	    	"click .selectForm-dropdown-listItem": "select:accountType",
	    	"click #goBackToSearch": "goBackToSearch",
	    	"blur #addManual-balance": "formatCurrency",
	    	"keydown #addManual-balance": "filterCurrency",
	    	"keydown #addManual-name": "checkValidation",
	    	"click #addManualAccount-postAccount.green_btn": "_track:click:linking:postManualAccount"
	    },
	    initialize: function (options){
		    _.bindAll(this);
		    this.options = options;

		    this.model = options.model;
		    this.bindTo(this.model, 'change:searchTerm', this.render, this);

		    this.bindTo(this, "show:accountTypes:dropdown", this.showDropdown, this);
		    this.bindTo(this, "select:accountType", this.selectAccountType, this);
		    this.bindTo(this, "goBackToSearch", this.goBackToSearch, this);
		    this.bindTo(this, "filterCurrency", InputFiltering.currency, this);
		    this.bindTo(this, "formatCurrency", this.formatCurrency, this);
		    this.bindTo(this, "_track:click:linking:postManualAccount", this.postAccount, this);
		    this.bindTo(this, "checkValidation", this.checkValidation, this);

	    },
	    onShow:function(){
			this.$('#choose_account_type').NiceIt();

			this.renderCheckValid();
	    },
	    renderCheckValid: function(){
			//MORE THAN 3 CHARS, ENABLE BUTTON
			if($("#addManual-name").val().length > 3){
				$("#addManualAccount-postAccount").removeClass("trans_btn").addClass("green_btn");
			}else if($("#addManual-name").val().length <= 3){
				$("#addManualAccount-postAccount").removeClass("green_btn").addClass("trans_btn");
			}
	    },
		checkValidation:function(e){

			//PREVENTS INPUT OF NUMBERS
			if (e.keyCode >= 48 && e.keyCode <= 57){
				e.preventDefault();
				e.stopPropagation();
				return false;
			}

			//MORE THAN 3 CHARS, ENABLE BUTTON
			if($(e.currentTarget).val().length >= 3){
				$("#addManualAccount-postAccount").removeClass("trans_btn").addClass("green_btn");
			}else if($(e.currentTarget).val().length < 3){
				$("#addManualAccount-postAccount").removeClass("green_btn").addClass("trans_btn");
			}

		},
	    postAccount: function(){
	    	var accountType = $("#selectForm-input").val(),
	    		jsonPost = {},
	    		currentBalance = $("#addManual-balance").val();
	    		currentBalance = currentBalance.replace(",", "");

	    	if(currentBalance.charAt(0) === "-") currentBalance = currentBalance.substring(1); jsonPost['isAsset'] == false;

	    	jsonPost = {
	    		"accountName": $("#addManual-name").val(),
	    		"currentBalance": currentBalance || 0,
	    		"accountType": accountType
	    	};

	    	if(accountType == "otherAsset"){
				jsonPost[0].isAsset = true;
	    	}else if(accountType == "otherDebt"){
				jsonPost[0].isAsset = false;
	    	}

	    	this.options.stateMachine.postManualAccount(jsonPost);
	    },
	    formatCurrency: function(e){
	    	var formatted = utils.formatCurrency($(e.currentTarget).val(), false, false, true);
	    	$(e.currentTarget).val(formatted);
	    },
	    goBackToSearch: function(e){
	    	e.preventDefault();
	    	e.stopPropagation();

			this.model.set("filter", '');
	    	$(".linking_searchClear").trigger("click");
	    	$(".filter-item#filterReset").trigger("click");
	    },
	    showDropdown: function(){
	    	var dropdown = $("#addManualAccount-selectForm-dropdown");

	    	if(dropdown.is(":visible")){
	    		dropdown.fadeOut("fast");
	    		$("#selectFormToggle").removeClass("activeToggle");
	    	}else{
	    		dropdown.fadeIn("fast");
	    		$("#selectFormToggle").addClass("activeToggle");
	    	}
	    },
	    selectAccountType: function(e){
	    	var account = $(e.currentTarget).text();
	    	var type = $(e.currentTarget).data("type");
	    	var radioButtons = $("#addManualAccount-radioButtons");

	    	//ACTIONS = Fill Select Inout with text
	    	//          Fill hidden input with text
	    	//          Trigger Click on toggle button
	    	$("#addManualAccount-selectForm span.selectFormText").html(account);
	    	$("#selectForm-input").val(type);
	    	$("#selectFormToggle").trigger("click");

	    }
	});
});