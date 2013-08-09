define(function (require){
	'use strict';

	// DEPENDENCES
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');
	var Syphon = require("syphon");

	// TEMPLATES
	var LoginTemplate = require('text!./Template.Login.html');

	//VIEWS
	var LoadingScreen = require("./View.LoadingScreen");
	var LoginHeader = require("./Header/View.LoginHeader");
	var LoginForm = require("./Form/View.LoginForm");

	//COLLECTION
	var FormCollection = require("../../Collections/Collection.SitesForm");

	var SitesMfa = require("../../Models/Model.SiteMFA");

	Handlebars.registerHelper("foreach",function(arr,options) {
	    if(options.inverse && !arr.length)
	        return options.inverse(this);

	    var ssnArray = ["SSN", "Social Security Number", 
	    				"Social Security", "SS", "Social", "S/N"];

	    //Check for SSN Fields
		$.each(arr, function(i, item){
			if(item.inputs){
		    	if($.inArray(item.displayName, ssnArray) >= 0 && item.inputs.length >= 3){
		    		item.inputs[0].size = 3;
		    		item.inputs[1].size = 2;
		    		item.inputs[2].size = 4;
		    		item.inputs[2].last = true;
		    	}
			}
	    });   

	    return arr.map(function(item,index) {
	        item.$index = index;
	        item.$first = index === 0;
	        item.$last  = index === arr.length-1;
	        return options.fn(item);
	    }).join('');
	});

	return Backbone.Marionette.Layout.extend({
	    template: LoginTemplate,
	    triggers: {
	    	"submit #loginForm": "_track:click:linking:submitMFALoginForm",
	    	"click #linking-goBack": "goBack"
	    },
	    regions: {
	    	header: "#loginHeader_container",
	    	form: "#loginForm_container",
	    	loading: "#loginLoading"
	    },
	    initialize: function (options){
		    _.bindAll(this);
		    this.options = options;
		    this.fsm = this.options.stateMachine;

		    //Useful Sites to Test With
		    //-------------------------
		    //SELECT FORMS = 14244
		    //HAS ONE SELECT FORM = 13348
		    //SALLIE MAE = 14224
		    //Many fields - Stowe Vermont = 16101
		    //Many fields - Wild Turkey = 15714
		    //Required & Optional - Target CC = 16124

		    //SWITCH DATA SOURCE (ONLY NEEDED FOR MULTI LEVEL MFAs)
		    if(this.fsm.sitesMfa){
		    	this.data = this.fsm.sitesMfa;
		    }else{
		    	// var data = JSON.parse(this.fsm.linkRefresh.responseText);
		    	// this.data = new SitesMfa(data.refreshStatuses[0]);
		    	this.data = this.fsm.linkRefresh.first();
		    }

		    this.bindTo(this, "_track:click:linking:submitMFALoginForm", this.postFormData, this);
		    this.bindTo(this, "goBack", this.goBack, this);
	    },
	    onShow: function(){
	 		this.header.show(new LoginHeader({model: this.fsm.sitesLink}));
	 		this.form.show(new LoginForm({data: this.data}));
	 	},
	 	goBack: function(e){
	 		e.preventDefault();
	 		this.fsm.goToInitial();
	 	},
	 	postFormData: function(e){
	 		e.preventDefault();

	 		//Get data
    		var formData = Backbone.Syphon.serialize(this),
    			formKey = this.data.get("mfa").key,
    			runId = this.data.get("runId"),
    			siteId = this.data.get("siteId"),
    			yodleeItemId = this.data.get("yodleeItemId"),
    			mfaType = this.data.get("mfa").mfaType,
 				cleanedData = {};



 			//Make sure form values are wrapped in an array
    		$.each(formData, function(i, data){
    			cleanedData[i] = [data];
       		});

    		//Structure JSON Post
    		var jsonPost = {
    			"runId": runId,
    			"siteId": siteId,
    			"yodleeItemId": yodleeItemId,
    			"formKey": formKey,
    			"mfaType": mfaType,
    			"values": cleanedData
    		};

			this.fsm.postMfa(jsonPost);
	 	}
	});
});
