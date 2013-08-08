define(function (require) {
	'use strict';

	var Login = require('Views/Login/ItemView.Login');

	return {
		resources: {
			login: {
				constructor: Login,
				trigger: 'login',
				button: '#login'
			}
		},
		routes: {
			'Login': 'login'
		},
		controller: {
			login: function (page) {
				this.trackPageView('login');
				this.triggerRoute('login');
			}
		}
	};
});