define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var RelatedEntity = require('./RelatedEntity/ItemView.RelatedEntity');

	var Related = Backbone.Marionette.CompositeView.extend({
		itemView: RelatedEntity,
		itemViewContainer: '.related-entities',
		template: Template.Related,
		initialize: function (options) {

		},
		templateHelpers: function () {
			return {
				// name: name,
			};
		}
	});
	return Related;
});