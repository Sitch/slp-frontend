define(function (require){
	'use strict';

	var _ = require('underscore');

	var StringUtil = (function (){

		function toCamalCase (str){
			return ('' + str).replace(/(?:^|\s)\w/g, function (match){
				return match.toUpperCase();
			});
		}
		
		function truncate(desc, limit){
			return  (desc.length > limit - 3) ? desc.substring(0, limit) + '...' : desc;
		}

		return {
			truncate: truncate,
			toCamalCase: toCamalCase
		};
	}());

	return StringUtil;
});
