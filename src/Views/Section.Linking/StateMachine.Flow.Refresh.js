define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

	return {
		/*******
		 * Start Refresh Poller (GET /api/sites)
		 ********/
		refreshPollerStart: {
			fromTo: ['*', 'refreshPollStarted'],
			async: function (id) {
				App.LinkManager.refreshPoller.restart();

				return App.LinkManager.sitesRefresh.deferred;
			},
			after: function (id) {
				// App.vent.trigger('linkingFlow:toggleDrawer');
				this.goToInitial();
			}

		},
		/*******
		 * Check Status on Response of Refresh Poller
		 ********/
		refresh: {
			fromTo: ['refreshPollStarted',
			{
				WAITING: 'refreshPollStarted',
				SUCCESS: 'refreshSuccess',
				TRYAGAIN: 'refreshTryAgain',
				ERROR: 'errorFlow'
			}],
			async: function (id) {
				return App.LinkManager.refreshPoller.getResult();
			},
			onResolve: function (id) {
				return App.LinkManager.sitesRefresh.getSiteRefreshStatusById(id);
			},
			after: function () {
				switch(this.state.get('current')) {
					case 'refreshPollStarted':
						return this.refresh();
					case 'refreshSuccess':
						return this.finishLinking();
					case 'errorFlow':
						return this.errorFlow();
				}
			}
		},
		/*******
		 * If the 'SUCCESS' status was returned
		 * Exit Flow and Perform Cleanup
		 ********/
		finishLinking: {
			fromTo: ['*', 'linkComplete'],
			transition: function () {
				App.LinkManager.remove(this);
			}
		}
	};
});