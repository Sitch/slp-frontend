define(function(require) {
	'use strict';

	var ErrorInstance = require('error');

	return {
		create: function() {
			throw new ErrorInstance('InvalidFunctionInvocation', 'Cannot call backbone methods when using cacheable');
		},
		fetch: function() {
			throw new ErrorInstance('InvalidFunctionInvocation', 'Cannot call backbone methods when using cacheable');
		},
		save: function() {
			throw new ErrorInstance('InvalidFunctionInvocation', 'Cannot call backbone methods when using cacheable');
		},
		destroy: function() {
			throw new ErrorInstance('InvalidFunctionInvocation', 'Cannot call backbone methods when using cacheable');
		}
	};
});