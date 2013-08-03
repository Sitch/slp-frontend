define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var cookie = require('cookie');

	return {
		deepExtend: function (destination, source) {
			for (var property in source) {
				if (source[property] && source[property].constructor && source[property].constructor === Object) {
					destination[property] = destination[property] || {};
					this.deepExtend(destination[property], source[property]);
				} else {
					destination[property] = source[property];
				}
			}
			return destination;
		},




		cookie: {
			get: function (name) {
				var cookieName = window.encodeURIComponent(name) + "=",
					cookieStart = document.cookie.indexOf(cookieName),
					cookieValue = null;

				if (cookieStart > -1) {
					var cookieEnd = document.cookie.indexOf(";", cookieStart);
					if (cookieEnd == -1) {
						cookieEnd = document.cookie.length;
					}
					cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
				}
				return cookieValue;
			},
			set: function (name, value, expires, path, domain, secure) {
				var cookieText = window.encodeURIComponent(name) + "=" +
					window.encodeURIComponent(value);

				if (expires instanceof Date) {
					cookieText += "; expires=" + expires.toGMTString();
				}
				if (path) {
					cookieText += "; path =" + path;
				}
				if (domain) {
					cookieText += "; domain=" + domain;
				}
				if (secure) {
					cookieText += "; secure";
				}
				document.cookieText = cookieText;
			},
			unset: function (name, path, domain, secure) {
				this.set(name, "", new Date(0), path, domain, secure);
			}
		},

		/**
		 * Function: Utils.addAnimationListener(elem, animEvent, handler)
		 *
		 * This function binds an event listener for CSS3 animation and transition events.
		 *
		 * Mozilla supports standard event names for CSS3 animation/transition events.
		 *
		 * Webkit browsers and IE 10 support CSS3 animation/transition events with vendor prefixes
		 * (webkit and MS) and camel cases the event name, e.g. webkitAnimationStart, MSTransitionStart.
		 *
		 * IE 9 and under does not support CSS3 animations.
		 *
		 * @param: elem, DOM element to bind event listener to.
		 * @param: eventName, CSS3 animation or transition event. This function supports namespacing your events.
		 *		Supported events:
		 *			animationstart
		 *			animationiteration
		 *			animationend
		 *			transitionend
		 * @param: handler, event handler funciton.
		 *
		 */
		addAnimationListener: function (elem, eventName, handler) {
			var $browser = $.browser,
				regex = /^(\w)(\w{4,5}tion)(\w)([a-zA-Z|.]+)$/,
				prefix;

			/*
			 * If elem or eventName is not defined, or if it's IE and less than version 10, return.
			 */
			if (_.isUndefined(elem) || _.isUndefined(eventName) || ($browser.msie && parseInt($browser.version, 10) < 10)) {
				return;
			}

			if ($browser.mise || $browser.webkit) {
				prefix = (['MS', 'webkit'])[$browser.msie ? 0 : 1];

				// Build prefixed event name, e.g. MSAnimationStart, webkitAnimationStart
				eventName = prefix + eventName.replace(regex, function (match, firstChar, firstWord, secondChar, secondWord) {

					// Capitilize and camel case the event name, e.g. "animationstart" will become "AnimationStart".
					return firstChar.toUpperCase() + firstWord + secondChar.toUpperCase() + secondWord;
				});
			}

			elem.addEventListener(eventName, handler);
		},

		/**
		 * Function: Utils.addIframePixel(keyId)
		 *
		 * This function will set up an iframe pixel for conversion tracking using the contents of the DIBBLER cookie.
		 *
		 * The DIBBLER cookie is loaded and searched for the key named by keyId. If that key has a valid value,
		 * then the contents of DIBBLER are turned into a query string, an iframe is appended to the document,
		 * and its src is set to /x/conf/[keyId value]/?[query string]. If the iframe already exists, it's reused.`
		 *
		 * @param: keyId, string containing key in DIBBLER map to check for the slug of the iframe's src page.
		 */

		addIframePixel: function (keyId) {

			// Get the key/value map JSON from the cookie and parse it
			var cookieString = $.cookie('DIBBLER');
			var cookieMap = {};
			if (cookieString)
				cookieMap = JSON.parse(cookieString);

			// If the key/value map has a key equal to keyId, continue
			if (_.has(cookieMap, keyId)) {
				var src_slug = cookieMap[keyId];
				var url_prefix = '/x/conf/spc/';
				var qsVars = [];

				// Build a query string out of the key/value map from the cookie
				_.each(cookieMap, function (value, key) {
					qsVars.push(key + "=" + value);
				});
				var query_string = qsVars.join("&");

				var iframe_src = url_prefix + src_slug + "/?" + query_string;
				var iframe = $('#partner_pixel');
				if (!iframe.length) {
					// Create the iframe, if it doesn't already exist, and add it to the DOM
					iframe = $('<iframe>')
						.attr({
						id: 'partner_pixel',
						height: 1,
						width: 1
					}).css({
						display: 'none'
					});
					$('body').append(iframe);
				}

				// Set the iframe's src to the constructed URL
				$(iframe).attr('src', iframe_src);
			}
		},

		getObjLength: function (obj) {
			var count = 0;
			for (var i in obj) {
				if (obj.hasOwnProperty(i)) {
					count++;
				}
			}
			return count;
		},
		trim: function (s) {
			s = s.replace(/(^\s*)|(\s*$)/gi, "");
			s = s.replace(/[ ]{2,}/gi, " ");
			s = s.replace(/\n /, "\n");

			return s;
		},
		path: {
			getHash: function (fragment) {
				var match = window.location.href.match(/#(.*)$/);
				return match ? match[1] : '';
			},
			containedInHash: function (fragment) {
				return !!(this.getHash().indexOf(fragment) > -1);
			}
		},

		formatCurrency: function (number, round, noDecimal, noDollar, absolute) {
			var orig = number;

			if (number === undefined) {
				return;
			} else if (isNaN(number)) {
				number = number.replace(/\$|,/g, '');
				if (isNaN(number)) {
					return;
				}
			}

			noDollar = typeof noDollar !== 'undefined' ? noDollar : false;

			number = (round) ? Math.round(number) : number;

			var decimalPlaces = noDecimal || number === 0 ? 0 : 2,
				dot = '.',
				comma = ',',
				minus = !absolute && number < 0 ? '-' : '',
				dollarSign = noDollar ? "" : "$",
				i = parseInt(number = Math.abs(+number || 0).toFixed(decimalPlaces), 10) + "",
				j = (j = i.length) > 3 ? j % 3 : 0;

			if (isNaN(number) || number == 0) {
				return minus + dollarSign + "0.00";
			}

			return minus + dollarSign + (j ? i.substr(0, j) + comma : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + comma) + (decimalPlaces ? dot + Math.abs(number - i).toFixed(decimalPlaces).slice(2) : "");
		},

		removeCurrencyFormat: function (num) {
			if (num === undefined) {
				return 0;
			} else if (!isNaN(num)) {
				return num;
			}

			var num = num.replace(/\$|,/g, '');
			return isNaN(num) ? 0 : Number(num);
		},

		formatPercent: function (percent, maxAt100, excludeSymbol, leaveRemainder) {
			var s = '';
			if (isNaN(percent)) {
				return 0;
			}

			if (maxAt100 && percent > 1) {
				percent = 100;
			} else {
				percent *= 100;
				if (!leaveRemainder) {
					percent = Math.round(percent);
				}
			}
			return excludeSymbol ? percent : percent + '%';
		},

		truncate: function (val, lim) {
			var desc = val,
				limit = lim;

			if (desc.length > limit) {
				desc = desc.substring(0, limit);
				desc += '...';
			}

			return desc;
		},

		removePercentFormat: function (percent) {
			percent = parseInt(percent, 10);
			return isNaN(percent) ? 0.0 : percent / 100;
		}
	};
});