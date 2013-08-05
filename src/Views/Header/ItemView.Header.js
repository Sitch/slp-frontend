define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');
	var Sticky = require('jquery.sticky');

	var Search = require('./Trait.Search');

	var Header = Backbone.Marionette.ItemView.extend(_.extend(Search, {
		tagName: 'div',
		className: '',
		template: Template.Header,
		// templateHelpers: function () {
		// 	return {

		// 	};
		// },
		// events: {
		// 	'click .nav li': 'clickNav'
		// },
		// clickNav: function (event) {
		// 	event.preventDefault();
		// 	event.stopPropagation();

		// 	this.$('.nav li').removeClass('active');
		// 	this.$(event.target).parent().addClass('active');

		// 	App.Router.navigate(event.target.id, {
		// 		trigger: true
		// 	});
		// },
		onShow: function () {
			this.parallax();
		},
		parallax: function () {
			// $('#navbar').sticky({
			// 	topSpacing: 0
			// });

			// PARALLAX
			var landingImg = $('#landing img');
			var endingImg = $('#ending img');

			if (landingImg.length) {
				$(window).scroll(function () {
					var $this = $(this);
					var top = $this.scrollTop();
					landingImg.css('transform', 'translateY(' + (top / 3) + 'px)');
					endingImg.css('transform', 'translateY(' + (top / 3) + 'px)');
				});
			}
		}
	}));
	return Header;
});