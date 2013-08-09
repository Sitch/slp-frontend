define(function (require) {
	'use strict';

	var CacheableModel = require('Shared/Cacheable/Model.Cacheable');

	return CacheableModel.extend({
		initialize: function () {
			this.register('sitesFix');
		}
	});
});