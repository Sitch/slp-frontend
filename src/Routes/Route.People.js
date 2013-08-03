define(function (require) {
	'use strict';

	var People = require('../Views/People/Layout.People');

	return {
		resources: {
			people: {
				constructor: People,
				trigger: 'people',
				button: '#people'
			}
		},
		routes: {
			'people': 'people',
			'people/:id': 'peopleById'
		},
		controller: {
			people: function (page) {
				this.trackPageView('people');
				this.triggerRoute('people');
			},
			peopleById: function (id) {
				this.trackPageView('people/' + id);
				this.triggerRoute('people', {
					taskId: id
				});
			}
		}
	};
});