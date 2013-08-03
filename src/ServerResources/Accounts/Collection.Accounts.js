define(function (require) {
	'use strict';

	var _ = require('underscore');
	var CacheableCollection = require('Shared/Cache/Collection.Cacheable');
	var AccountModel = require('./Model.Account');

	var AccountCollection = CacheableCollection.extend({
		urlRead: function () {
			return '/api/account';
		},
		initialize: function () {
			this.register('accounts');
		},
		model: AccountModel
	});
	return AccountCollection;
});