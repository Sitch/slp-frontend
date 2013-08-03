define(function (require) {
	'use strict';

	var Tasks = require('Views/Section.Task/Layout.Task');

	return {
		resources: {
			tasks: {
				constructor: Tasks,
				trigger: 'tasks',
				button: '#tasks'
			}
		},
		routes: {
			'tasks': 'tasks',
			'tasks/:id': 'tasksById'
		},
		controller: {
			tasks: function (page) {
				this.trackPageView('tasks');
				this.triggerRoute('tasks');
			},
			tasksById: function (id) {
				this.trackPageView('tasks/' + id);
				this.triggerRoute('tasks', {
					taskId: id
				});
			}
		}
	};
});