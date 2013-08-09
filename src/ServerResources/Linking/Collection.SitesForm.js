define(function (require) {
	'use strict';

	var CacheableCollection = require('Shared/Cacheable/Collection.Cacheable');

	return CacheableCollection.extend({
		initialize: function (options) {
			this.register('sitesForm');
			this.setSiteId(options.siteId);
		},
		urlRead: function () {
			return [App.environment.services.sites, 'form', this.siteId].join('/');
		},
		setSiteId: function (siteId) {
			this.siteId = siteId;
		},
		parse: function (response) {
			return response.Form;
		}
	});
});