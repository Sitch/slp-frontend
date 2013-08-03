define(function (require){
	'use strict';

	var $ = require('jquery');

	// Handle Internal Error Tracking
	function Erroring (global, environment){
		this.global = global;
		this.errorTracking = environment.errorTracking;
		
		global.onError = this.defaultError;
	}

	Erroring.prototype = {
	    postError: function (data){
		    var jQueryAvailable = global.$ && global.$.ajax;

		    if (jQueryAvailable) {
			    global.$.ajax({
			        url: ENVIRONMENT.environment.services.analytics,
			        type: 'POST',
			        contentType: 'application/json',
			        data: JSON.stringify({
			            eventType: 'error',
			            eventData: data
			        })
			    });
		    }
	    },
	    ajaxError: function (event, response){

		// $(window.document).ajaxError(function (evt, jqXHR, settings) {
		// 	if (jqXHR.status === 409) {
		// 		global.App.SessionTimer.logout();
		// 	}
		// });

	    	switch(resposne){
	    		case 400: break; // bad request
	    		case 401: break; // unauthorized
	    		case 403: break; // forbidden
	    		case 405: break; // method not allowed
	    		case 408: break; // request timeout
	    	}
	    },
	    requirejsError: function (error){
		    var routerAvailable = global.App && global.App.Router && typeof global.App.Router.getSection === 'function';
		    var stackTraceAvailable = !!global.printStackTrace;

		    this.postError({
		        type: 'requirejs',
		        page: (routerAvailable) ? global.App.Router.getSection() : 'unknown',
		        name: error.name,
		        message: error.message,
		        stack: (stackTraceAvailable) ? global.printStackTrace({
			        e: error
		        }) : ''
		    });
	    },
	    defaultError: function (message, file, line){
		    var routerAvailable = global.App && global.App.Router && typeof global.App.Router.getSection === 'function';

		    this.postError({
		        type: 'runtime',
		        page: (routerAvailable) ? global.App.Router.getSection() : 'unknown',
		        name: 'OnError',
		        message: message,
		        file: file,
		        line: line
		    });
	    }
	};

	return Erroring;
});