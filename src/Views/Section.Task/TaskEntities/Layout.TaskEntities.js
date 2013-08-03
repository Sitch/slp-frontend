define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	// var Task = require('./TaskEntities/CompositeView.TaskEntities');
	// var TaskLoading = require('./TaskLoading/ItemView.TaskLoading');

	var Attachment = require('./Attachment/ItemView.Attachment');
	var Contact = require('./Attachment/ItemView.Contact');
	var Email = require('./Attachment/ItemView.Email');
	var Entity = require('./Attachment/ItemView.Entity');
	var Evernote = require('./Attachment/ItemView.Evernote');


	var TaskEntitiesLayout = Backbone.Marionette.Layout.extend({
		template: Template.TaskEntities,
		tagName: 'div',
		className: 'task',
		regions: {
			content: '#entities'
		},
		initialize: function (options) {
			this.options = options || {};
			this.tasks = this.cache.get('getEntities', {
				id: this.options.id
			});
		},
		onShow: function () {
			var self = this;
			if (this.tasks.deferred.state() === 'pending') {
				// this.content.show(new TaskLoading());
			}
			$.when(this.tasks.deferred).then(function () {
				// self.content.show(new Task(this.options));
			});
		}
	});
	return TaskEntitiesLayout;
});