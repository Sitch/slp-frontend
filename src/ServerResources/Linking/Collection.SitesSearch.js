define(function (require) {
	'use strict';

	var CacheableCollection = require('Shared/Cacheable/Collection.Cacheable');

	return CacheableCollection.extend({
		initialize: function () {
			this.register('sitesSearch');
		},
		parse: function (response) {
			return response.searchResults;
		}
	});
});