define(function (require) {
	'use strict';

	var _ = require('underscore');
	var CacheableModel = require('Shared/Cache/Model.Cacheable');

	var FormSchemaModel = CacheableModel.extend({
		url: function () {
			return '/api/form/schema';
		},
		initialize: function () {
			this.register('formSchema');
		},
		parse: function (schema) {
			return schema;
		},
		readError: function(){
			App.trigger('error:ajaxReadFail', {
				name: 'Form Schema',
				resource: this
			});
		}
	});
	return FormSchemaModel;
});