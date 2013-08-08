define(function (require) {
	'use strict';

	return {
		// Charts
		'LoanCalculator': require('hbars!Chart-LoanCalculator'),

		// Login
		'Login': require('hbars!Login'),

		// Errors
		'PathNotFound': require('hbars!Error-PathNotFound'),
		'AjaxReadError': require('hbars!Error-AjaxRead'),

		// Marketing
		'Marketing': require('hbars!Marketing'),

		// Header
		'Header': require('hbars!Header'),

		// Footer
		'Footer': require('hbars!Footer'),

		// Section.Dashboard
		'Dashboard': require('hbars!Dashboard'),
		'DashboardSidenav': require('hbars!Dashboard-Sidenav'),
		'DashboardLoading': require('hbars!Dashboard-Loading'),
		
		// Section.Signup
		'Signup': require('hbars!Signup'),
		'BasicRegistration': require('hbars!Signup-BasicRegistration'),
		'AdvancedRegistration': require('hbars!Signup-AdvancedRegistration'),
		'SignupForm': require('hbars!Signup-Form'),
		'SignupLoading': require('hbars!Signup-Loading')

	};
});