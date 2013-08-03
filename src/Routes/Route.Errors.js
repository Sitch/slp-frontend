define(function (require) {
	'use strict';

	var PathNotFound404View = require('../Views/404/ItemView.PathNotFound');

	return {
		resources: {
			pageNotFound: {
				constructor: PathNotFound404View,
				trigger: 'error',
				button: null
			}
		},
		routes: {
			'404': 'pageNotFound',
			'*path': 'invalidRoute'
		},
		controller: {
			pageNotFound: function (page) {
				this.trackPageView('pageNotFound');
				this.triggerRoute('pageNotFound');
			},
			invalidRoute: function () {
				App.Router.navigate('404', {
					trigger: true
				});
			}
		}
	};
});