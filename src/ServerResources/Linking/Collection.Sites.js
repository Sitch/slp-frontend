define(function (require) {
	'use strict';

	var _ = require('underscore');
	var Backbone = require('backbone');

	var CacheableCollection = require('Shared/Cacheable/Collection.Cacheable');

	var Site = Backbone.Model.extend({
		idAttribute: 'siteId'
	});

	return CacheableCollection.extend({
		model: Site,
		initialize: function () {
			this.register('sites');
		},
		parse: function (response) {
			return _.filter(response.sites, function(site){
				return site.isManual == false;
			});
		},
		isAllRefreshed: function () {
			return _.all(this.models, function (model) {
				return !model.get('isRefreshing');
			});
		},
		numOfErrors: function () {
			return _.filter(this.models, function (site) {
				return site.get("hasErrors");
			}).length;
		},
		hasErrors: function () {
			return _.any(this.models, function (model) {
				return model.get('hasErrors');
			});
		},
		hasAccounts: function () {
			return !!this.length;
		},
		alreadyLinked: function(id){
			return _.any(this.models, function (model) {
				return model.get('contentServiceId') == id;
			});
		},
		getSiteRefreshStatusById: function (id) {
			var site = this.where({
				siteId: parseInt(id, 10)
			}).shift();

			if(!site) {
				return 'WAITING';
			}
			return site.get('isUAR') ? 'ERROR' : site.get('hasErrors') ? 'TRYAGAIN' : 'SUCCESS';
		}
	});
});