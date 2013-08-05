define(function (require) {
	'use strict';

	var Accounts = require('./Accounts/Collection.Accounts');
	var FormData = require('./Forms/Model.FormData');
	var FormSchema = require('./Forms/Model.FormSchema');
	var User = require('./Model.User');

	return {
		constructorMap: {
			'accounts': Accounts,
			'formData': FormData,
			'formSchema': FormSchema,
			'user': User
		},
		invalidateMap: {
			'accounts': 'accounts',
			'formData': 'formData',
			'formSchema': 'formSchema',
			'user': 'user'
		}
	};
});