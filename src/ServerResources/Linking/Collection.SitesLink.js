define(function (require) {
	'use strict';

	var CacheableModel = require('Shared/Cacheable/Model.Cacheable');

	return CacheableModel.extend({
		initialize: function (options) {
			this.register('sitesLink');
			this.setSiteId(options.siteId);
		},
		urlRead: function () {
			return App.environment.services.sitesLink;
		},
		setSiteId: function (siteId) {
			this.siteId = siteId;
		}
	});
});