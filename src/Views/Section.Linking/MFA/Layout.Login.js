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
	    	"submit #loginForm": "_track:click:linking:submitLoginForm",
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

		    var data = JSON.parse(this.fsm.linkRefresh.refreshStatuses);

		    //GET COLLECTION FROM STATEMACHINE
		    this.collection = new SitesFix(data);
		    this.bindTo(this, "_track:click:linking:submitLoginForm", this.postFormData, this);
		    this.bindTo(this, "goBack", this.goBack, this);
	    },
	    onShow: function(){
	 		this.header.show(new LoginHeader({model: this.fsm.sitesLink}));
	 		this.form.show(new LoginForm({collection: this.collection}));
	 	},
	 	goBack: function(e){
	 		e.preventDefault();
	 		this.fsm.goToInitial();
	 	},
	 	postFormData: function(e){
	 		e.preventDefault();

	 		//Get data
    		var formData = Backbone.Syphon.serialize(this),
    			formKey = this.fsm.sitesForm.first().get("key"),
    			contentServiceId = this.fsm.sitesForm.first().get("contentServiceId"),
 				cleanedData = {};

 			//Make sure form values are wrapped in an array
    		$.each(formData, function(i, data){
    			cleanedData[i] = [data];
       		});

    		//Structure JSON Post
    		var jsonPost = {
    			"contentServiceId": contentServiceId,
    			"formKey": formKey,
    			"values": cleanedData
    		};

			this.fsm.postForm(jsonPost);
	 	}
	});
});
