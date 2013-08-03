define(function (require) {
	'use strict';

	var _ = require('underscore');
	var CacheableModel = require('Shared/Cache/Model.Cacheable');
	// var moment = require('moment');
	var locale = require('locale');

	var TaskModel = CacheableModel.extend({
		// service: 'task',
		urlRead: function () {
			return '/api/task';
		},
		initialize: function () {
			this.register('task');
		},
		validate: function (attr) {
			if (!attr.name) {
				return locale.task.errors.name;
			}
			if (!attr.start) {
				return locale.task.errors.start;
			}
			if (!attr.end) {
				return locale.task.errors.end;
			}
		}
		// ,
		// prettyTime: function () {
		// 	return moment(this.get('start')).calendar();
		// },
		// parse: function (response) {

		// 	var icons = App.Cache.get('icons');

		// 	response.prettyTime = moment(response.start).calendar();
		// 	response.entityTypeIcon = icons.get('seer-task').get('icon');

		// 	response.addURL = '/browse/everything?taskID=' + response.id;
		// 	response.url = '/entity/seer-task/' + response.id;

		// 	return response;
		// }
	});
	return TaskModel;

});