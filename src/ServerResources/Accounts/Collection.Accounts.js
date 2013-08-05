define(function (require) {
	'use strict';

	var _ = require('underscore');
	var CacheableCollection = require('Shared/Cache/Collection.Cacheable');
	var AccountModel = require('./Model.Account');

	var AccountCollection = CacheableCollection.extend({
		model: AccountModel,
		urlRead: function () {
			return ['/api', App.userId, 'accounts'].join('/');
		},
		initialize: function () {
			this.register('accounts');
		},
		parse: function (accounts) {
			return accounts;
		}
	});
	return AccountCollection;
});