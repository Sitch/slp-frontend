define(function (require) {
	'use strict';

	var DateUtils = (function () {
		/*
			Helper function, allows flexible funtion 
			definitions. Caller can pass a date object, 
			or a string in yyyy-mm-dd format, or no date 
			and the called function will use the current date.		
		*/
		function checkDate(date) {
			date = date || new Date();

			if(typeof date === 'string') {
				date = new Date(DateUtils.dateFromString(date));
			}

			return date;
		}

		/* Helper that zero pads numbers */
		function zeroPad(num) {
			return (+num < 10 ? "0" : "") + num;
		}
		

		return {
			days   : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			months : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

			/* Helper to get the current timestamp */
			timeStamp: function() {
				return + new Date();
			},

			/* 
				Converts yyyy-mm-dd to a Date object,
				replaces zero padded numbers, 
				e.g. '03' replaced with '3' 
			*/
			dateFromString: function(dateStr) {
				return new Date(dateStr.replace(/-(\d)/g, '/$1'));
			},

			/* Calculate the last day of any month */
			lastDayOfMonth: function(date) {
				date = checkDate(date);
				return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
			},

			strftime:  function(format, date) {
				/* Formatter funciton look up table */
				var formats = {
					/* Zero padded date, e.g. 05 */
					d: function (date) {
						
						return zeroPad(date.getDate());
					},
					
					dd: function (date){
						return date.getDate();
					},

					/* Non-zero padded date, e.g. 5 */
					e: function (date) {
						return date.getDate();
					},

					/* Zero padded month, e.g. 09 */
					m: function (date) {
						return zeroPad(date.getMonth() + 1);
					},
					
					mm: function (date) {
						return date.getMonth() + 1;
					},

					/* Short text day of the week, e.g. Wed */
					a: function(date) {
						return DateUtils.days[date.getDay()].substring(0, 3);
					},

					/* Full text day of the week, e.g. Wednesday */
					A: function(date) {
						return DateUtils.days[date.getDay()];
					},

					/* Short text month, e.g. Sep */
					b: function(date) {					
						return DateUtils.months[date.getMonth()].substring(0, 3);						
					},

					/* Full text month, e.g. September */
					B: function() {
						return DateUtils.months[date.getMonth()];
					},

					/* Two digit year, e.g. 12 */
					y: function (date) {
						return zeroPad(date.getYear() % 100);
					},

					/* Four digit year, e.g. 2012 */
					Y: function (date) {
						return date.getFullYear();
					},
					
					S: function(date) {
						return zeroPad(date.getSeconds());
					},

					M: function(date) {
						return zeroPad(date.getMinutes());
					},

					/* Ordinal of the day of the month, e.g. th */
					o: function(date) {
						var d = date.getDate();

						/* If statement skips numbers from 10 - 19 */
						if(d < 10 || d > 19) {
							switch(d % 10) {
								case 1: return 'st';
								case 2: return 'nd';
								case 3: return 'rd';
							}
						}

						return 'th';
					},

					/* Format short cuts */
					F: '%Y-%m-%d', /* e.g. 2012-09-05 */
					D: '%m/%d/%y'  /* e.g. 09/05/2012 */
				};

				date = checkDate(date);

				/*
					Replace callback checks lookup table for functions or shortcuts and
					executes function or calls strftime() passing in the shortcut,
					otherwise just returns the matched token without taking action.
				*/
				return (format + "").replace(/%([a-zA-Z]+)/g, function (m, f) {
					var formatter = formats && formats[f];
					if (typeof formatter == "function") {
						return formatter.call(formats, date);
					} else if (typeof formatter == "string") {
						return DateUtils.strftime(formatter, date);
					}

					return f;
				});
			},
			getTimeZoneAdjustedDate: function(dateStr){
				var date = new Date(dateStr);
				date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
				return date;
			},

			/* Wrapper functions for backward compatibility with older implementation of DateUtils. */
			getFullMonthYear: function(dateStr) {
		    	return DateUtils.strftime('%B %Y', dateStr);
		    },
			numToMonthDay: function(dateStr) {
				return DateUtils.strftime('%b %d', dateStr);
			},
			numToMonthDayYear: function(dateStr) {
				return DateUtils.strftime('%b %d, %Y', dateStr);
			},
			subtractOneMonth: function(dateStr){
				// TODO: This is problematic due to time zone conversion.
				var date = this.getTimeZoneAdjustedDate(dateStr);
				date.setMonth(date.getMonth() - 1);
				return date;
			},
		   facetDate: function(date){
		   		return date.substr(2);
		   }
		};
	}());

	return DateUtils;
});
