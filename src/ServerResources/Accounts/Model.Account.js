define(function (require) {
	'use strict';

	var _ = require('underscore');
	var CacheableModel = require('Shared/Cache/Model.Cacheable');

	var AccountModel = CacheableModel.extend({
		urlRead: function () {
			return ['/api/account', this.id].join('/');
		},
		initialize: function () {
			this.register('account');
		},
		parse: function (account) {
			return account;
		}
	});
	return AccountModel;
});