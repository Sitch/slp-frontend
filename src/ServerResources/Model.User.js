define(function (require) {
	'use strict';

	var _ = require('underscore');
	var CacheableModel = require('Shared/Cache/Model.Cacheable');

	var UserModel = CacheableModel.extend({
		defaults: {
			password: '',
			username: '',
			email: '',
			agrees: false
		},
		writeOnly: true,
		url: function () {
			return '../api/users';
		},
		initialize: function () {
			this.register('user');
		},
		hasErrors: function () {
			var errors = this.getErrors();
			if (errors.password || errors.username || errors.email || errors.agrees) {
				return errors;
			}
			return false;
		},
		getErrors: function () {
			var username = this.get('username');
			var email = this.get('email');
			var password = this.get('password');
			var agrees = this.get('agrees');

			return {
				password: password.length < 4 || password.length > 12,
				username: username.length < 4 || username.length > 12,
				email: email.length < 4 || email.length > 20,
				agrees: !agrees
			};
		}
	});
	return UserModel;
});