define(function (require) {
	'use strict';

	var Marketing = require('Views/Section.Marketing/ItemView.Marketing');

	return {
		resources: {
			marketing: {
				constructor: Marketing,
				trigger: 'marketing',
				button: '#marketing'
			}
		},
		routes: {
			'Marketing': 'marketing'
		},
		controller: {
			marketing: function (page) {
				this.trackPageView('marketing');
				this.triggerRoute('marketing');
			}
		}
	};
});