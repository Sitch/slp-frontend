define(function (require) {
	'use strict';

	var Accounts = require('./Accounts/Collection.Accounts');
	// var Contacts = require('./Contacts/Collection.Contacts');
	// var Contact = require('./Contacts/Model.Contact');
	var Entities = require('./Entities/Collection.Entities');
	// var Entity = require('./Entities/Model.Entity');
	// var Related = require('./Tasks/Collection.Related');
	// var Task = require('./Tasks/Model.Task');
	var Tasks = require('./Tasks/Collection.Tasks');
	var User = require('./Model.User');

	return {
		constructorMap: {
			'accounts': Accounts,
			// 'contacts': Contacts,
			// 'contact': Contact,
			'entities': Entities,
			// 'entity': Entity,
			// 'folders': Folders,
			// 'related': Related,
			// 'task': Task,
			'tasks': Tasks,
			'user': User
		},
		invalidateMap: {
			'accounts': 'accounts',
			'contacts': 'contacts',
			'contact': 'contact',
			'entities': 'entities',
			'entity': 'entity',
			'folders': 'folders',
			'related': 'related',
			'task': 'task',
			'tasks': 'tasks',
			'user': 'user'
		}
	};
});