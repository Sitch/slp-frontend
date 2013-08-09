define(function (require){
	'use strict';
	// DEPENDENCES
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	// TEMPLATES
	var Template = require('text!./Template.Loading.html');
	var mainTpl = require('text!./Main/Template.LoadingMain.html');
	var headerTpl = require('text!./Header/Template.LoadingHeader.html');


	var FormCollection = require("../../Collections/Collection.SitesForm");
	var LoadingHeader = require("./Header/View.LoadingHeader");
	var LoadingMain = require("./Main/View.LoadingMain");


	return Backbone.Marionette.Layout.extend({
	    template: Template,
	    headerTpl: headerTpl,
	    mainTpl: mainTpl,
	    isError: false,
	    enableFunFacts: true,
	    idName: "loadingView",
	    regions: {
	    	header: "#loading_header",
	    	main: "#loading_body"
	    },
		triggers: {
			"click #goToErrorFlow": "_track:click:linking:goToErrorFlow"
		},
	    initialize: function (options){
		    _.bindAll(this);
		    this.options = options;
		    this.fsm = options.stateMachine;

		    this.bindTo(this, "_track:click:linking:goToErrorFlow", this.errorFlow, this);

		    if(this.fsm.errorNameOverride){
		    	this.model = new Backbone.Model({siteName: this.fsm.errorNameOverride});
		    }else{
		    	//SWITCH MODEL FOR ERROR FLOW
		    	this.model = this.isError ? this.fsm.legacySitesFix : this.fsm.sitesForm.first();
		    }
	    },
	    onShow:function(){
	    	var that = this;

	    	var options = {
	    		accountType: that.accountType,
	    		model: that.model,
	    		isError: that.isError,
	    		enableFunFacts: that.enableFunFacts
	    	};

	    	var headerOptions = _.clone(options);
	    	var mainOptions = _.clone(options);

	    	headerOptions.template = this.headerTpl;
	    	mainOptions.template = this.mainTpl;

	    	this.header.show(new LoadingHeader(headerOptions, this.fsm.errorNameOverride));
	    	this.main.show(new LoadingMain(mainOptions));
	    },
	    errorFlow: function(e){
	    	e.preventDefault();
	    	e.stopPropagation();

	    	this.options.stateMachine.state.set("current", "errorFlow");
	    	this.options.stateMachine.getError(this.model.get("siteId"));
	    }
	});
});
