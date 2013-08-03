define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');

	var Search = require('./Trait.Search');

	var Navigation = Backbone.Marionette.ItemView.extend(_.extend(Search, {
		tagName: 'div',
		className: 'navbar navbar-fixed-top',
		template: Template.Navigation,
		templateHelpers: function () {

			// var message = [].join(';');

			return {
				twitterHref: 'https://twitter.com/share?url=https%3A%2F%2Fgetseer.com&amp;text=just%20used%20%40getseer%20to%20find%20what%20I%20needed%20fast&amp;hashtags=gmail%2Cdropbox'
			};
		},
		events: {
			'click .nav li': 'clickNav'
		},
		clickNav: function (event) {
			event.preventDefault();
			event.stopPropagation();

			this.$('.nav li').removeClass('active');
			this.$(event.target).parent().addClass('active');

			App.Router.navigate(event.target.id, {
				trigger: true
			});
		}
	}));
	return Navigation;
});