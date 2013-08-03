define(function (require) {
	'use strict';

	var Priorities = require('Views/Section.Priorities/Layout.Priorities');

	return {
		resources: {
			priorities: {
				constructor: Priorities,
				trigger: 'priorities',
				button: '#priorities'
			}
		},
		routes: {
			'priorities': 'priorities',
			'priorities/:id': 'priorityBySection'
		},
		controller: {
			priorities: function (page) {
				this.trackPageView('priorities');
				this.triggerRoute('priorities');
			},
			priorityBySection: function (section) {
				this.trackPageView('priorities/' + section);
				this.triggerRoute('priorities', {
					section: section
				});
			}
		}
	};
});