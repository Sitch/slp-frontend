define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	return Backbone.Marionette.Region.extend({
		el: '#notification',
		constructor: function () {
			_.bindAll(this);
			Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
			this.on('view:show', this.showNotification, this);
		},
		getEl: function (selector) {
			var $el = $(selector);
			$el.on('hidden', this.close);
			return $el;
		},
		showNotification: function (view) {
			view.on('close', this.hideNotification, this);

			this.$el.modal('show');
		},
		hideNotification: function () {
			this.$el.modal('hide');
		}
	});
});