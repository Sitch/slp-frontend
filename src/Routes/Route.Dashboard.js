define(function (require) {
	'use strict';

	var Dashboard = require('Views/Section.Dashboard/Layout.Dashboard');

	return {
		resources: {
			dashboard: {
				constructor: Dashboard,
				trigger: 'dashboard',
				button: '#dashboard'
			}
		},
		routes: {
			'Dashboard': 'dashboard',
			'Dashboard/:section': 'dashboardBySection'
		},
		controller: {
			dashboard: function () {
				this.authRoute(function(){
					this.trackPageView('dashboard');
					this.triggerRoute('dashboard');
				});
			},
			dashboardBySection: function (section) {
				this.authRoute(function(section){
					this.trackPageView('dashboard/' + section);
					this.triggerRoute('dashboard', {
						section: section
					});
				}, section);
			}
		}
	};
});