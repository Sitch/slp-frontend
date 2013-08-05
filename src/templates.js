define(function (require) {
	'use strict';

	return {
		// Errors
		'PathNotFound': require('hbars!Error-PathNotFound'),
		'AjaxReadError': require('hbars!Error-AjaxRead'),

		// Header
		'Header': require('hbars!Header'),

		// Footer
		'Footer': require('hbars!Footer'),

		// Section.Dashboard
		'Dashboard': require('hbars!Dashboard'),
		'DashboardLoading': require('hbars!Dashboard-Loading'),
		
		// Section.Signup
		'Signup': require('hbars!Signup'),
		'SignupForm': require('hbars!Signup-Form'),
		'SignupLoading': require('hbars!Signup-Loading')
	};
});