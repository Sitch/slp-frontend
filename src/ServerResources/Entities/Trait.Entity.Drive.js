define(function (require) {
	'use strict';

	return {
		parse: function (response) {
			response.embedLink = response.alternateLink;
			return response;
		}
	};
});