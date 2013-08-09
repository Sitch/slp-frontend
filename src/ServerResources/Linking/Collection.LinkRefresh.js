define(function (require) {
	'use strict';

	var CacheableCollection = require('Shared/Cacheable/Collection.Cacheable');

	return CacheableCollection.extend({
		initialize: function () {
			this.register('sitesRefresh');
		},
		comparator: function(site) {
  			return -site.index;
		},
		parse: function (response) {
			return response.refreshStatuses;
		},
		getLinkRefreshStatusById: function (id) {
			var result = this.where({
				siteId: parseInt(id, 10)
			}).shift();

			var status = result.get('status');
			if(status === 'ERROR') {
				return result.get('isUAR') ? 'ERROR' : 'NOACTION';
			}
			return status;
		}
	});
});