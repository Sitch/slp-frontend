define(function (require) {
	'use strict';

	var _ = require('underscore');
	var CacheableModel = require('Shared/Cache/Model.Cacheable');

	var ContactModel = CacheableModel.extend({
		// service: 'contact',
		urlRead: function () {
			return '/api/contact';
		},
		initialize: function () {
			this.register('contact');
		}
	});
	return ContactModel;
});