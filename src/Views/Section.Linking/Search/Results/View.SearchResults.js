define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	var TinyTooltip = require('../../../../../libs/jplugin/JPlugin.TinyTooltip');

	var template = require('text!./Template.SearchResults.html');
	var SitesSearchCollection = require('../../../Collections/Collection.SitesSearch');

	Handlebars.registerHelper('y', function(value) {
	   return (value * 50) - 50;
	});

	Handlebars.registerHelper('x', function(value) {
	   return (value * 100) - 100;
	});

	return Backbone.Marionette.Layout.extend({
		template: template,
		triggers: {
			"click #popularResults-back": "slide:popularResults:left",
			"click #popularResults-forward": "slide:popularResults:right"
		},
		initialize: function (options) {
			_.bindAll(this);
			this.options = options;

			if(this.options.isPopular){
				this.collection = options.collection.first();
			}else{
				this.collection = options.collection;
			}


			this.currentPage = 1;

			this.popularResultsElement = $('ul.popularResults');

			this.bindTo(this, "slide:popularResults:left", this.slidePopularResultsLeft, this);
			this.bindTo(this, "slide:popularResults:right", this.slidePopularResultsRight, this);
		},
		beforeRender: function () {

			if(this.options.isPopular){

				this.buckets = [];
				var i = 0,
					len = this.collection.attributes.results.length,
					results = _.clone(this.collection.attributes.results);

				while(i < len) {
					this.buckets.push(results.splice(-i, 10));
					i += 10;
				}

				this.templateHelpers = function () {
					return {
						popular: this.options.isPopular,
						siteBuckets: this.buckets
					}
				};
			}else{
				this.buckets = [];
				var i = 0,
					len = this.collection.response.searchResultCount;
				while(i < len) {
					this.buckets.push(this.collection.response.searchResults.splice(-i, 5));
					i += 5;
				}
				this.templateHelpers = function () {
					return {
						count: this.collection.response.searchResultCount,
						popular: this.options.isPopular,
						siteBuckets: this.buckets
					}
				};
			}

		},
		onShow: function () {
			this.slideConfig = this.sliderConfig();

			$('.popularAccount').tooltip({
				appendToParent: true
			});

			var that = this,
				arrows = $("#popularResults-back, #popularResults-forward");
			if(!this.options.isPopular){
				_.defer(function(){
					if(that.buckets.length <= 2){
						$("#popularResults-back, #popularResults-forward").hide();
					}else{
						$("#popularResults-back, #popularResults-forward").show();
					}
				});
			}
			
			$(document).on('keyup', this.slideWithDirectionKeys);
			$("#popularResults-back, #popularResults-forward").show();

		},
		onClose: function () {
			this.currentCount = 0;
			$(document).off('keyup', this.slideWithDirectionKeys);
		},
		slideWithDirectionKeys: function (e) {
			if(e.keyCode == 37) this.slidePopularResultsLeft();
			if(e.keyCode == 39) this.slidePopularResultsRight();
		},
		sliderConfig: function () {
			if(this.options.isPopular) {

				return {
					containerElement: "div#siteSlider",
					beginning: ["auto", "0px"],
					disableBackButtonAt: "-570px",
					disableForwardButtonAt: "0px",
					stopScrollAt: "-570px",
					fadeElements: "#popularResults-leftFade, #popularResults-rightFade"
				};

			} else {

				var stopPosition = (Math.floor(this.buckets.length - 1) * 285),
					lastPosition = stopPosition - 570;

					stopPosition = stopPosition <= 0 ? false : "-" + stopPosition + "px";
					lastPosition = lastPosition > 0 ? "-" + lastPosition + "px" : false;

				return {
					containerElement: "div#siteSlider",
					beginning: ["auto", "0px"],
					disableBackButtonAt: "-570px",
					disableForwardButtonAt: lastPosition,
					stopScrollAt: stopPosition,
					fadeElements: "#popularResults-leftFade, #popularResults-rightFade"
				};
			}
		},
		slideAction: function (direction, config) {
			this.$el.find(config.containerElement).stop().animate({
				left: direction + "=570px"
			}, "fast", "easeInOutCirc", function () {
				$(config.fadeElements).stop().fadeOut("fast");
			});
		},
		switchButtonStates: function (direction, config, position) {
			if(direction == "left") {
				if(position == config.disableBackButtonAt) $("#popularResults-back").addClass("disabled");
				if(position == config.stopScrollAt) $("#popularResults-forward").removeClass("disabled");
			} else {

				if((position == "auto" && config.disableForwardButtonAt == "0px") || config.disableForwardButtonAt == false || position == config.disableForwardButtonAt) {
					$("#popularResults-forward").addClass("disabled");
				}
				if(position == config.beginning[0] || position == config.beginning[1]) $("#popularResults-back").removeClass("disabled");
			}
		},
		showSlideFades: function (config) {
			$(config.fadeElements).stop().show();
		},
		slidePopularResultsLeft: function () {
			this.currentPage = this.currentPage--;
			//GET CONFIG
			this.slideConfig = this.sliderConfig();
			//IF NOT ANIMATING
			if(!this.$el.find(this.slideConfig.containerElement).is(":animated")) {
				//CURENT POSITION
				this.popularResultsPosition = this.$el.find(this.slideConfig.containerElement).css('left');
				//IF NOT "AUTO" or "0px"
				if(this.popularResultsPosition != this.slideConfig.beginning[0] && this.popularResultsPosition != this.slideConfig.beginning[1]) {
					this.showSlideFades(this.slideConfig);
					this.slideAction("+", this.slideConfig);
				}
				//HANDLE BUTTON STATES
				this.switchButtonStates("left", this.slideConfig, this.popularResultsPosition);
			}
		},
		slidePopularResultsRight: function () {
			this.currentPage = this.currentPage + 1;
			//GET CONFIG
			this.slideConfig = this.sliderConfig();
			//IF NOT ANIMATING
			if(!this.$el.find(this.slideConfig.containerElement).is(":animated")) {
				//CURENT POSITION
				this.popularResultsPosition = this.$el.find(this.slideConfig.containerElement).css('left');
				//IF CURRENT POSITION DOESN'T EQUAL ((Math.floor(this.buckets.length / 2)) * 570)
				if(this.popularResultsPosition != this.slideConfig.stopScrollAt && this.slideConfig.stopScrollAt != false) {
					//SHOW FADE
					this.showSlideFades(this.slideConfig);
					//SLIDE RESULTS
					this.slideAction("-", this.slideConfig);
				}
				//HANDLE BUTTON STATES
				this.switchButtonStates("right", this.slideConfig, this.popularResultsPosition);
			}
		}
		
	});
});