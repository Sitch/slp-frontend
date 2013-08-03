define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Tasks = require('./TaskGroups/CollectionView.TaskGroups');
	var TasksLoading = require('./TasksLoading/ItemView.TasksLoading');

	var PrioritiesLayout = Backbone.Marionette.Layout.extend({
		template: Template.Priorities,
		tagName: 'div',
		// className: 'priorities',
		regions: {
			content: '#priorities'
		},
		initialize: function (options) {
			this.options = options || {};
			this.tasks = this.cache.get('tasks');
			this.accounts = this.cache.get('accounts');
		},
		onShow: function () {
			var self = this;
			if (this.tasks.deferred.state() === 'pending') {
				this.content.show(new TasksLoading());
			}
			$.when(this.tasks.deferred).then(function () {
				self.content.show(new Tasks(this.options));
			});
		}
	});
	return PrioritiesLayout;
});