define(function (require) {
	'use strict';

	var PathNotFound404View = require('Views/Errors/ItemView.PathNotFound');
	var AjaxReadErrorView = require('Views/Errors/ItemView.AjaxReadError');

	return {
		resources: {
			pageNotFound: {
				constructor: PathNotFound404View,
				trigger: 'pageNotFound',
				button: null
			},
			ajaxReadFail: {
				constructor: AjaxReadErrorView,
				trigger: 'ajaxReadFail',
				button: null
			}
		},
		routes: {
			'Error/404': 'pageNotFound',
			'Error/Connecting': 'ajaxReadFail',
			'*path': 'invalidRoute'
		},
		controller: {
			pageNotFound: function () {
				this.trackPageView('pageNotFound');
				this.triggerRoute('pageNotFound');
			},
			ajaxReadFail: function () {
				if(!App.Erroring.log.length){
					return App.Router.navigate('', {
						trigger: true
					});
				}
				this.trackPageView('ajaxReadFail');
				this.triggerRoute('ajaxReadFail');
			},
			invalidRoute: function () {
				App.Router.navigate('Error/404', {
					trigger: true
				});
			}
		}
	};
});