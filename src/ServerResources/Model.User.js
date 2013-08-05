define(function (require) {
	'use strict';

	var _ = require('underscore');
	var CacheableModel = require('Shared/Cache/Model.Cacheable');

	var UserModel = CacheableModel.extend({
		urlRead: function () {
			return '/api/user';
		},
		initialize: function(){
			this.register('user');
		}
	});
	return UserModel;
});