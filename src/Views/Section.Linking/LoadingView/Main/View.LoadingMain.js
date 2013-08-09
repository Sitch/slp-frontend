define(function (require){
	'use strict';
	// DEPENDENCES
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	// TEMPLTES
	var funFacts = require('funFacts');

	return Backbone.Marionette.ItemView.extend({
	    templateHelpers: function(){
	    	return {
	    		funFacts : this.funFacts
	    	}
	    },
	    initialize: function (options){
		    _.bindAll(this);
		    this.options = options;
		},
		beforeRender: function(){
			if(this.options.enableFunFacts){
				this.enableFunFacts();
			}  
	    },
	    onRender: function(){
	    	if(this.options.enableFunFacts){
				this.manageFacts();
			}
	    },
		enableFunFacts: function(){
		    //Return random array of facts
		    this.funFacts = funFacts.sort(function() { return 0.5 - Math.random();});
		},
		manageFacts: function(){
			var that = this;
			var counter = 0,
				animate = "",
				speed = 8000;

			setInterval(function(){
				//If counter has reached the end, scroll back to start
				if(counter == 50){
					animate = "0px";
					counter = 0;
				}else{
					animate = "-=550px";
				}
				that.$el.find("#funFacts_list").animate({left: animate}, "slow", "easeOutElastic");
				counter++;
			}, speed);
		}
	});
});
