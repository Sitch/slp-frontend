define(function (require) {
	'use strict';

	var Browse = require('../Views/Section.Browse/Layout.Browse');

	return {
		resources: {
			browse: {
				constructor: Browse,
				trigger: 'browse',
				button: '#browse'
			}
		},
		routes: {
			'browse': 'browse',
			'browse/:section': 'browseBySection'
		},
		controller: {
			browse: function (page) {
				this.trackPageView('browse');
				this.triggerRoute('browse');
			},
			browseBySection: function (section) {
				this.trackPageView('browse/' + section);
				this.triggerRoute('browse', {
					section: section
				});
			}
		}
	};
});