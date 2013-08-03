define(function (require) {
	'use strict';

	var _ = require('underscore');
	var CacheableModel = require('Shared/Cache/Model.Cacheable');
	// var encodeBase64 = require('encodeBase64');
	var locale = require('locale');

	var UserModel = CacheableModel.extend({
		urlRead: function () {
			return '/api/user';
		},
		idAttribute: 'primaryEmail',
		// service: 'user',
		initialize: function(){
			this.register('user');
		},
		// encode: function () {
		// 	var email = this.get('email');
		// 	var password = this.get('password');

		// 	return 'Basic  ' + encodeBase64(email + ':' + password);
		// },
		validate: function (attrs) {
			var email = attrs.email;
			var password = attrs.password;

			if (this.isNew() && (!email || !password)) {
				throw new Error(locale.account.creation.invalid);
			}
		}
	});
	return UserModel;
});