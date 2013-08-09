define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var SitesFix = require('../Models/Model.SiteFix');

	return {
		/*******
		 * GET /sites/fix?site=XXXXXX - Check Error
		 ********/
		getError: {
			fromTo: ['*', {
				ERROR: 'errorState',
				SUCCESS: 'errorFlowSuccess',
				NOACTION: 'noActionError'
			}],
			transitionState: 'simpleLoading',
			async: function (id, nameOverride) {
				if(nameOverride) this.errorNameOverride = nameOverride;

				//IF SITESFIX ALREADY EXISTS AND AN MFA IS RETURNED, DON'T RE-FETCH
				if(this.sitesFix && this.sitesFix.get('handlerFormType') === 'MFA') {
					return this.sitesFix.deferred;
				}
				this.sitesFix = new SitesFix();
				this.sitesFix.setQueryParams({
					site: id
				});
				return this.sitesFix.serverRead();
			},
			onResolve: function(id, type){
				var handlerStatus = this.sitesFix.get('handlerStatus');

				if(type) return 'NOACTION';

				if(handlerStatus === 'FLOW'){
					return 'ERROR';
				}else{
					return 'SUCCESS';
				}
			}
		},
		/*******
		 * POST /sites/fix?site=XXXXXX - Post form and check response
		 ********/
		postErrorForm: {
			fromTo: ['errorState',
			{
				ERROR: 'errorFlow',
				SUCCESS: 'errorFlowSuccess',
				NEWERRORFLOW: 'newErrorFlow',
				SORRY: 'noActionError'
			}],
			transitionState: 'errorLoading',
			async: function (form) {
				this.legacySitesFix = this.sitesFix;

				this.sitesFix = new SitesFix(form);
				return this.sitesFix.serverCreate();
			},
			onResolve: function (form) {
				var handlerStatus = this.sitesFix.get('handlerStatus'),
					isUAR = this.sitesFix.get('isUAR');

				if(handlerStatus === 'FLOW'){
					//STILL IN CURRENT ERROR FLOW
					return 'ERROR';
				}else{
					if(handlerStatus === 'REFRESHING' || handlerStatus === 'OK'){
						return 'SUCCESS';
					}else{
						return isUAR ? 'NEWERRORFLOW' : 'SORRY';
					}
				}

				//return this.sitesFix.get('handlerStatus') === 'FLOW' ? 'ERROR' : 'FIXED';
			},
			after: function (form) {
				switch(this.state.get('current')) {
					case 'errorFlowSuccess':
						this.errorSuccess();
						break
					case 'errorFlow':
						break;
					case 'newErrorFlow':
						delete this.sitesFix;
					case 'noActionError':
				}
			}
		},
		errorSuccess: {
			fromTo: ['errorFlowSuccess', 'initial'],
			async: function(){
				var deferred = $.Deferred();
				setTimeout(function(){
					deferred.resolve();
				}, 4000);
				return deferred;
			}
		}
	};
});