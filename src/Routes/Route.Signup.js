define(function (require) {
	'use strict';

	var Signup = require('Views/Section.Signup/Layout.Signup');

	return {
		resources: {
			signup: {
				constructor: Signup,
				trigger: 'signup',
				button: '#signup'
			}
		},
		routes: {
			'signup': 'signup',
			'signup/:id': 'signupBySection'
		},
		controller: {
			signup: function (page) {
				this.trackPageView('signup');
				this.triggerRoute('signup');
			},
			signupBySection: function (section) {
				this.trackPageView('signup/' + section);
				this.triggerRoute('signup', {
					section: section
				});
			}
		}
	};
});