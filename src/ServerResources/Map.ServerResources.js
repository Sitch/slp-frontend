define(function (require) {
	'use strict';

	var Auth = require('./Model.Auth');
	var Accounts = require('./Accounts/Collection.Accounts');
	var FormData = require('./Forms/Model.FormData');
	var FormSchema = require('./Forms/Model.FormSchema');
	var User = require('./Model.User');

	return {
		constructorMap: {
			'auth': Auth,
			'accounts': Accounts,
			'formData': FormData,
			'formSchema': FormSchema,
			'user': User
		},
		invalidateMap: {
			'auth': [],
			'accounts': ['accounts'],
			'formData': ['formData'],
			'formSchema': ['formSchema'],
			'user': ['user']
		}
	};
});