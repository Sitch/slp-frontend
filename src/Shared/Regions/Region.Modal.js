define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	return Backbone.Marionette.Region.extend({
		el: '#modal',
		constructor: function () {
			_.bindAll(this);
			Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
			this.on('view:show', this.showModal, this);
		},
		getEl: function (selector) {
			var $el = $(selector);
			$el.on('hidden', this.close);
			return $el;
		},
		isOpen: function () {
			return !!this.currentView;
		},
		showModal: function (view) {
			this.bindTo(App.vent, 'closeModal', this.hideModal, this);
			view.on('view:close', this.hideModal, this);
			this.$el.modal('show');
		},
		hideModal: function () {
			this.$el.modal('hide');
		}
	});
});