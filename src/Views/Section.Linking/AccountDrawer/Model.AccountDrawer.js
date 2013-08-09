define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

	return Backbone.Model.extend({
		defaults: {
			drawerOpen: false
		}
	});
});