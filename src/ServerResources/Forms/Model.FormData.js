define(function (require) {
	'use strict';

	var _ = require('underscore');
	var CacheableModel = require('Shared/Cache/Model.Cacheable');

	var FormDataModel = CacheableModel.extend({
		urlRead: function () {
			return ['/api/form', App.userId, 'data'].join('/');
		},
		initialize: function () {
			this.register('formData');
		},
		parse: function (data) {
			return data;
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