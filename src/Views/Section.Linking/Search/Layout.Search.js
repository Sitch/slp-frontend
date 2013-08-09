define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	//MODEL
	var SearchModel = require('./Model.Search');

	var template = require('text!./Template.Search.html');

	var SearchInput = require('./Input/View.SearchInput');
	var SearchResults = require('./Results/View.SearchResults');

	var MiniAddManual = require('./MiniAddManualAccount/Layout.AddManualAccount');
	var SitesSearchCollection = require('../../Collections/Collection.SitesSearch');

	var PopAccounts = Backbone.Model.extend({
		url: function () {
			return App.environment.popularAccounts;
		},
		// url: '/fe/src/Linking/Views/Search/Results/popularAccounts.json',
		initialize: function () {
			// Assign the Deferred issued by fetch() as a property
			// this.deferred = this.fetch();
		}
	});

	return Backbone.Marionette.Layout.extend({
		template: template,
		regions: {
			input: '#searchInput_container',
			results: '#searchResults_container'
		},
		triggers: {
			'click .siteName': 'click:linking:selectSiteName',
			'click li': 'click:linking:selectSiteNamePopular',
			'click #addManualAccount': '_track:click:linking:addManualAccount'
		},
		initialize: function (options) {
			_.bindAll(this);
			this.options = options;

			this.popAccounts = new PopAccounts();
			this.popAccounts.deferred = this.popAccounts.fetch();


			this.model = new SearchModel();
			this.bindTo(this, 'click:linking:selectSiteName', this.getForm, this);
			this.bindTo(this, 'click:linking:selectSiteNamePopular', this.getFormPopular, this);
			this.bindTo(this, '_track:click:linking:addManualAccount', this.displayAddManualAccount, this);
			this.bindTo(this.model, 'change:searchTerm', this.searchChange, this);
			this.bindTo(this.model, 'change:filter', this.searchChange, this);
			//this.bindTo(this.model, 'change:hasResults', this.checkResults, this);


			var that = this;
			$.when(this.popAccounts.deferred).then(function(){
				that.getPopular();
			});
		},
		getForm: function (e) {
			var id = $(e.currentTarget).data('id');

			App.Analytics.trackEvent('click', {
				section: 'linking',
				name: 'selectSiteSite',
				id: id
			});
			this.options.stateMachine.getForm(id);
		},
		getFormPopular: function (e) {
			var id = $(e.currentTarget).data('id');

			App.Analytics.trackEvent('click', {
				section: 'linking',
				name: 'selectPopularSite',
				id: id
			});
			this.options.stateMachine.getForm(id);
		},
		onShow: function () {
			this.display();
		},
		checkResults: function () {
			var option = {
				model: this.model,
				stateMachine: this.options.stateMachine,
				collection: this.collection,
				isPopular: this.isPopular
			};

			var self = this;
			if(!this.model.get('hasResults')) {
				$('#addManualAccount').hide();
				_.defer(function(){
					self.results.show(new MiniAddManual(option));
				});
			} else {
				_.defer(function(){
					self.results.show(new SearchResults(option));
				});
				$('#addManualAccount').show();
			}
		},
		displayAddManualAccount: function () {
			this.options.stateMachine.goToManualAccountView();
		},
		display: function () {
			var option = {
				model: this.model
			};
			this.input.show(new SearchInput(option));
			//this.results.show(new SearchResults(option));
		},
		searchChange: function () {


			this.currentCount = 0;

			// //console.log(this.model, this.model.get('searchTerm'), this.model.get("hasSearched"));
			// //IF SEARCH TERM LENGTH IS GREATER THAN 3, GET SEARCH RESULTS
			// if(this.model.get('searchTerm').length > 3) this.getResults();
			// this.model.set("hasSearched", true);

			// //IF SEARCH TERM LENGTH IS LESS THAN 3 AND YOU'VE ALREADY SEARCHED
			// if(this.model.get('searchTerm').length < 3 && this.model.get("hasSearched")) this.getPopular();

			// //if(this.model.get('filter') && !this.model.get("hasSearched")) this.getPopular();

			// //IF SEARCH TERM LENGTH IS LESS THAN 3 AND YOU'VE ALREADY SEARCHED
			if(this.model.get('searchTerm').length < 2) this.getPopular();

			// //IF SEARCH TERM LENGTH IS GREATER THAN 3, GET SEARCH RESULTS
			if(this.model.get('searchTerm').length > 2) this.getResults();
		},
		getPopular: function () {

			var filter = this.model.get("filter");

			var popularModel = filter ? this.popAccounts.get(filter) : this.popAccounts.get("overall");

			console.log("filter", filter, popularModel);

			//NEW COLLECTION
			this.collection = new Backbone.Collection({results: popularModel});

			//ON RESPONSE, RE-RENDER RESULTS
			//this.bindTo(this.collection, 'reset', this.checkResults, this);
			//SET FLAG
			this.isPopular = true;
			var that = this;
			that.model.set("hasResults", true);

			that.checkResults();
		},
		getResults: function () {

			//NEW COLLECTION
			this.collection = new SitesSearchCollection();
			//SET TERM PARAM TO SEARCH INPUT AND REQUEST COLLECTION
			this.collection.setQueryParams({
				term: this.model.get('searchTerm'),
				container: this.model.get('filter')
			})
			this.collection.serverRead();
			//SET FLAG
			this.isPopular = false;

			var that = this;
			$.when(this.collection.deferred).then(function () {
				that.model.set("hasResults", !! that.collection.length);
				that.checkResults();
			});
		}
	});
});