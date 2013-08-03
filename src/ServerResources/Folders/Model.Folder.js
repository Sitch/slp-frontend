define(function (require) {
	'use strict';

	var _ = require('underscore');
	var Backbone = require('backbone');

	var FolderModel = Backbone.Model.extend({
		idAttribute: 'uuid'
	});
	return FolderModel;
});