define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	// var Task = require('./TaskEntities/CompositeView.TaskEntities');
	var BrowseLoading = require('./BrowseLoading/ItemView.BrowseLoading');

	var BrowseLayout = Backbone.Marionette.Layout.extend({
		template: Template.Browse,
		tagName: 'div',
		className: 'browse',
		regions: {
			contents: '.contents',
			sidebar: '.account-categories'
		}
		// ,
		// initialize: function (options) {
		// 	this.options = options || {};

		// 	var params = {
		// 		id: this.options.id
		// 	};

		// 	this.task = this.cache.get('task', params);
		// 	this.related = this.cache.get('related', params);
		// 	this.entities = this.cache.get('getEntities', params);
		// },
		// onShow: function () {
		// 	var self = this;
		// 	var task = this.task.deferred;
		// 	var related = this.related.deferred;
		// 	var entities = this.entities.deferred;

		// 	if (task.state() === 'pending' ||
		// 		related.state() === 'pending' ||
		// 		entities.state() === 'pending') {

		// 		this.content.show(new TaskLoading());
		// 	}

		// 	$.when(task, related, entities).then(function () {
		// 		self.content.show(new Task(this.options));
		// 	});
		// }
	});
	return BrowseLayout;
});