define(function (require) {
	'use strict';

	var _ = require('underscore');
	var Backbone = require('backbone');
	var CacheableCollection = require('Shared/Cache/Collection.Cacheable');
	var EntityModel = require('../Entities/Model.Entity');

	var RelatedCollection = Backbone.Collection.extend({
		// service: 'related',
		model: EntityModel,
		urlRead: function () {
			return '/api/related/' + this.id + (this.type ? "?type=" + this.type : "");
		},
		initialize: function () {
			this.register('related');
		}
	}).include(CacheableCollection);
	return RelatedCollection;
});