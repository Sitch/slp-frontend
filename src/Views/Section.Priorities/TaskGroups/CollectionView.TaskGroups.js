define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	var TaskGroup = require('./TaskGroup/CompositeView.TaskGroup');
	var EmptyTaskGroup = require('./EmptyTaskGroup/ItemView.EmptyTaskGroup');

	var TaskGroups = Backbone.Marionette.CollectionView.extend({
		emptyView: EmptyTaskGroup,
		itemView: TaskGroup,
		initialize: function (options) {
			var tasks = this.cache.get('tasks');

			this.collection = new Backbone.Collection(tasks.partition());
		}
	});
	return TaskGroups;
});