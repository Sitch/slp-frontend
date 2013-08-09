define(function (require) {
	'use strict';

	var CacheableModel = require('Shared/Cacheable/Model.Cacheable');

	return CacheableModel.extend({
		initialize: function () {
			this.register('sitesMfa');
		},
		getPostResult: function () {
			switch(this.get('status')) {
				case 'REFRESHING':
					return 'FIXED';
				case 'MFA':
					return 'MFA';
				default:
					return 'ERROR';
					//status and
			}
		}
	});
});