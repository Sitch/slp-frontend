define(function (require) {
	'use strict';

	var CacheableCollection = require('Shared/Cache/Collection.Cacheable');
	var EntityModel = require('./Model.Entity');

	var EntityCollection = CacheableCollection.extend({
		urlRead: function(){
			return '/api/getEntities';
		},
		initialize: function () {
			this.register('entities');
		},
		idAttribute: 'uuid',
		model: EntityModel
	});
	return EntityCollection;
});