define(function(require) {
	'use strict';
	// DEPENDENCES
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	// TEMPLATES
	var Template = require('text!./Template.SearchInput.html');

	return Backbone.Marionette.ItemView.extend({
		template: Template,
		initialize: function(options) {
			_.bindAll(this);
			this.options = options;
			this.bindTo(this, 'change:searchInput', this.searchChange, this);
			this.bindTo(this, 'clear:searchInput', this.clearSearch, this);
			this.bindTo(this, 'open:filterDropdown', this.openFilterDropdown, this);
			this.bindTo(this, 'filter:search', this.filterSearch, this);
			this.bindTo(this.model, 'change:hasResults', this.disableFilter, this);

		},
		ui: {
			searchInput: '.linking_searchInput',
			searchMagnify: '.linking_searchButton',
			searchClear: '.linking_searchClear'
		},
		triggers: {
			'keyup input': 'change:searchInput',
			'click .linking_searchClear': 'clear:searchInput',
			'click .selectInput': 'open:filterDropdown',
			'click .filter-item': 'filter:search'
		},
		onShow: function(){
			this.ui.searchInput.focus();
		},
		disableFilter: function(){
			if(this.model.get("hasResults")){
				$("#searchAccounts-filter-container").css({opacity: '1'});
			}else{
				$("#searchAccounts-filter-container").css({opacity: '0.5'});
			}
		},
		clearSearch: function() {
			this.ui.searchInput.val("");
			this.searchChange();

			//RESET FILTER
			this.model.set("filter", '');
	    	$(".filter-item#filterReset").trigger("click");
		},
		openFilterDropdown: function(){
	    	var dropdown = $(".selectFormDropdown");

	    	if(dropdown.is(":visible")){
	    		dropdown.fadeOut("fast");
	    		$("#selectFormToggle").removeClass("activeToggle");
	    	}else{
	    		dropdown.fadeIn("fast");
	    		$("#selectFormToggle").addClass("activeToggle");
	    	}					
		},
		filterSearch: function(e){

			if(!this.model.get("hasResults")) return;

			$(".filter-item").removeClass("active").addClass("inactive");
			$(e.currentTarget).addClass("active");

			//UPDATE THE MODEL WITH THE SEARCH TERM
			this.model.set("filter", $(e.currentTarget).data("id"));		
		},
		changeButton: function(val) {
			if(val.length >= 1) {
				var that = this;
				this.ui.searchMagnify.fadeOut(200, function() {
					that.ui.searchClear.fadeIn(200);
				});
			} else {
				var that = this;
				this.ui.searchClear.fadeOut(200, function() {
					that.ui.searchMagnify.fadeIn(200);
				})
			}
		},
		updateSearch: _.debounce(function(){
			//UPDATE THE SEARCH BUTTON (ex. magnifying glass or X icon)
			this.changeButton(this.val);

			//UPDATE THE MODEL WITH THE SEARCH TERM
			this.model.set("searchTerm", this.val);

			if(!this.model.get("hasResults") && !this.val.length){
				this.model.set("hasResults", true);
				this.model.set("filter", '');
	    		$(".filter-item#filterReset").trigger("click");				
			}
		}, 300),
		searchChange: function() {

			this.val = this.ui.searchInput.val();

			if(this.val.length <= 3){
				this.changeButton(this.val);
				this.model.set("searchTerm", this.val);

				if(!this.model.get("hasResults") && !this.val.length){
					this.model.set("hasResults", true);
					this.model.set("filter", '');
		    		$(".filter-item#filterReset").trigger("click");				
				}
			}else{
				this.updateSearch();
			}

		}
	});
});