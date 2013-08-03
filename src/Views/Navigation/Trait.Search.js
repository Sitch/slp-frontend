define(function(require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var ErrorInstance = require('error');

	return {
		events: {
			'keyup #toolbarSearch' : 'search',
			'click #clearSearch' : 'clearSearch'
		},
		search: function(){
			this.$search = this.$search || this.$('#toolbarSearch');

			var text = this.$search.val();
			App.vent.trigger('toolbar:search', text);
		},
		clearSearch: function(){
			this.$search.val('');
		}
	};
});