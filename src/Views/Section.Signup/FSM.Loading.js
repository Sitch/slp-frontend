define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');

	return {
		signup: {
			fromTo: ['signup', 'basic'],
			transition: function () {
			}
		},
		basic: {
			fromTo: ['basic', 'advanced'],
			transitionState: 'loading',
			async: function(){
				var model = App.Cache.get('user');
				return model.serverUpdate();
			}
		},
		advanced: {
			fromTo: ['advanced', 'complete'],
			transitionState: 'loading',
			async: function(form){
				var model = App.Cache.get('user');
				return model.serverUpdate();
			},
			after: function(){
				App.Router.navigate('default', {trigger: true});
			}
		}
	};
});