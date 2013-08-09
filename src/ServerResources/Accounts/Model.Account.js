define(function (require) {
	'use strict';

	var _ = require('underscore');
	var CacheableModel = require('Shared/Cache/Model.Cacheable');

	// var LoanCollection = require('../Loans/Collection.Loans');

	var AccountModel = CacheableModel.extend({
		url: function () {
			// return ['/api/account', this.id].join('/');
			return '../api/accounts/' + this.get('id');
		},
		initialize: function () {
			this.register('account');
		}
		// ,
		// parse: function(account){
		// 	var loans = account.loans;
		// 	delete account.loans;
		// 	this.loans = new LoanCollection(loans);
		// 	return account;
		// }
		//,
		// compoundPeriods: function(){
		// },
		// project: function (range) {
		// 	var model = this;
		// 	return _.map(range, function(tick){
		// 		return model.compoundPeriods(tick);
		// 	});
		// }
		// ,
		// parse: function (account) {
		// 	return account;
		// }
	});
	return AccountModel;
});