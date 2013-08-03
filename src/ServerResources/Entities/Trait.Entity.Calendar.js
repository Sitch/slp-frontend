define(function (require) {
	'use strict';

	var moment = require('moment');

	return {
		parse: function (response) {

			var end = response.end;
			var start = response.start;
			var hours = (end - start) / (1000 * 60 * 60);

			response.prettyEnd = moment(response.end).format('MM/DD/YYYY h:mma');
			response.prettyStart = moment(response.start).format('MM/DD/YYYY h:mma');
			response.allDay = (hours === 24) ? true : false;

			return response;
		}
	};
});