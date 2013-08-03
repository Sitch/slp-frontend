define(function (require){
	'use strict';

	var ErrorInstance = function (name, message){
		this.name = name;
		this.constructor = name;
		this.message = message;
	};
	ErrorInstance.prototype = new Error();

	return ErrorInstance;
});
