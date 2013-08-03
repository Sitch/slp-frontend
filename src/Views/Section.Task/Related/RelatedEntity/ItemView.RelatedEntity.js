define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	// var Draggable = require('./Trait.Draggable');

	var RelatedEntity = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'related-entity',
		template: Template.RelatedEntity
	});
	return RelatedEntity;
});