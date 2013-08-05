define(function (require) {
	'use strict';

	// These are default developer overrides
	// Copy this file to /src/environment.js
	return {
		analytics: {
			enabled: false
		},
		cache: {
			cacheBuster: true
		},
		debug: {
			enabled: true
		},
		ga: {
			enabled: false
		}
	};
});