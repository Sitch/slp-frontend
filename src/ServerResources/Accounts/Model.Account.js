define(function (require) {
	'use strict';

	var _ = require('underscore');
	var CacheableModel = require('Shared/Cache/Model.Cacheable');
	var FoldersCollection = require('../Folders/Collection.Folders');
	var applyAccountModelDefault = require('./Lambda.Account.apply.model.default');
	var applyAccountViewDefault = require('./Lambda.Account.apply.view.default');

	var AccountModel = CacheableModel.extend({
		url: function () {
			return '/api/account';
		},
		parse: function (account) {
			return applyAccountViewDefault(
				applyAccountModelDefault(account));
		}
	});
	return AccountModel;
});