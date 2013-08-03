define(function (require) {
	'use strict';

	var _ = require('underscore');
	var Backbone = require('backbone');
	var CacheableCollection = require('Shared/Cache/Collection.Cacheable');
	var TaskModel = require('./Model.Task');

	var TasksCollection = CacheableCollection.extend({
		model: TaskModel,
		urlRead: function () {
			return '/api/tasks';
		},
		initialize: function () {
			this.register('tasks');
		},
		comparator: function (task) {
			return task.get("start");
		},
		getTotal: function () {
			return this.totalOffset + this.models.length;
		},
		parse: function (response) {
			this.totalOffset = parseInt(response.total, 10) - response.data.length;
			return response.data;
		},
		reduceByType: function (type) {
			return this.where({
				type: type
			});
			// .map(function (model) {
			// 	return model.toJSON();
			// });
		},
		partition: function () {

			var reminders = this.reduceByType('reminder');
			var requests = this.reduceByType('request');
			var scheduling = this.reduceByType('scheduling');

			// return new TasksCollection(_.compress([].concat(reminders, requests, scheduling)));
			return _.compact([].concat(reminders, requests, scheduling));

		}
	});
	return TasksCollection;
});