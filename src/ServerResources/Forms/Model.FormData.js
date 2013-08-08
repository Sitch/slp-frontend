define(function (require) {
	'use strict';

	var _ = require('underscore');
	var CacheableModel = require('Shared/Cache/Model.Cacheable');

	var FormDataModel = CacheableModel.extend({
		url: function () {
			// return ['/api/form', App.userId, 'data'].join('/');
			return '../api/form/status';
		},
		initialize: function () {
			this.register('formData');
		},
		readError: function(){
			App.trigger('error:ajaxReadFail', {
				name: 'User Form',
				resource: this
			});
		}
	});
	return FormDataModel;
});