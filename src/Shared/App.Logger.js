define(function (require) {
	'use strict';

	var _ = require('underscore');
	var ErrorInstance = require('error');

	// Nice formatting for logs and hijack console.log when necessary
	function Logger(options) {

	}

	Logger.prototype = {
		_log: function (method, name, entry) {
			var padding = '                     ';
			var url = _.isFunction(entry.urlRead) ? entry.urlRead() : entry.url();

			var left = Math.floor((16 - name.length) / 2);
			var right = (name.length % 2) ? left + 1 : left;
			name = padding.split('', left).join('') + name + padding.split('', right).join('');

			debug.info(['<CACHE> ' + method, name, url].join(' : '));
		},
		log: function (data) {

		},
		error: function (event, response) {

		}
	};
	return Logger;
});