define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var AjaxReadErrorView = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'invalid-path',
		template: Template.AjaxReadError,
		templateHelpers: function(){
			return {
				errors: App.Erroring.log
			};
		},
		initialize: function(){
			this.listenTo(App, 'error:ajaxReadFail:render', this.render);
		}
	});
	return AjaxReadErrorView;
});