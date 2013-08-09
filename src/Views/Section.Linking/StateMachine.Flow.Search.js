define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	var SitesForm = require('../Collections/Collection.SitesForm');
	var SitesLink = require('../Collections/Collection.SitesLink');
	var SiteMFA = require('../Models/Model.SiteMFA');
	var AccountModel = require("../../Account_Center/Model.Account_Center");

	var LinkRefresh = require('../Collections/Collection.LinkRefresh');

	return {
		/*******
		 * GOTO INITIAL STATE (Account Search)
		 * CLEANUP OBJECTS/COLLECTIONS CREATED WITHIN FLOW
		 ********/
		goToInitial: {
			fromTo: ['*', 'initial'],
			transition: function () {
				delete this.sitesForm;
				delete this.sitesLink;
				delete this.linkRefresh;
				delete this.sitesMfa;
				delete this.manualLink;
				delete this.sitesFix;
				delete this.errorStatus;
			}
		},
		goToManualAccountView: {
			fromTo: ['*', 'addManual'],
			transitionState: 'simpleLoading',
			transition: function(){

			}
		},
		postManualAccount: {
			fromTo: ['*', 'initial'],
			transitionState: 'simpleLoading',
			async: function(form){
				this.manualLink = new AccountModel(form);
				return this.manualLink.serverCreate();
			},
			after: function(){
				this.goToInitial();
			}
		},
		/*******
		 * REQUEST LOGIN FORM TO RENDER
		 ********/
		getForm: {
			fromTo: ['initial', 'displayLoginForm'],
			transitionState: 'simpleLoading',
			async: function (id) {

				this.sitesForm = new SitesForm({
					siteId: parseInt(id, 10)
				});
				return this.sitesForm.serverRead();
			}
		},
		/*******
		 * POST LOGIN FORM to SITES/LINK
		 * Go directly to formRefresh after
		 ********/
		postForm: {
			fromTo: ['displayLoginForm', 'linkCreated'],
			transitionState: 'formLoading',
			async: function (form) {
				this.sitesLink = new SitesLink(form);
				return this.sitesLink.serverCreate();
			},
			after: function () {
				var formId = this.sitesLink.get('siteLinkResult').siteId;
				return this.formRefresh(formId);		
			}
		},
		loadingSuccess: {
			fromTo: ['successState', 'refreshFlow'],
			async: function(){
				var deferred = $.Deferred();
				setTimeout(function(){
					deferred.resolve();
				}, 4000);
				return deferred;
			},
			after: function(){
				var formId = this.sitesLink.get('siteLinkResult').siteId;
				this.refreshPollerStart(formId);		
			}
		},
		/*******
		 * PERFORM SYNC REFRESH OF SITE
		 * DECIDE WHAT FLOW TO ENTER or ACTION TO TAKE
		 ********/
		formRefresh: {
			fromTo: ['linkCreated',
			{
				REFRESHING: 'successState',
				ERROR: 'errorFlow',
				MFA: 'mfaState',
				NOACTION: 'initial'
			}],
			async: function (id) {
				this.linkRefresh = new LinkRefresh();
				this.linkRefresh.setQueryParams({
					site: parseInt(id, 10),
					sync: true
				});
				return this.linkRefresh.serverCreate();
			},
			onResolve: function (id) {
				console.log(this.linkRefresh.getLinkRefreshStatusById(id));
				return this.linkRefresh.getLinkRefreshStatusById(id);
			},
			after: function (id) {
				switch(this.state.get('current')) {
					case 'successState':
						return this.loadingSuccess();
					case 'errorFlow':
						return this.getError(id);
					case 'initial':
						this.goToInitial();
						break;
				}
			}
		},
		/*******
		 * POST MFA FORM
		 * DECIDE FLOW ON RESPONSE
		 ********/
		postMfa: {
			fromTo: ['mfaState',
			{
				ERROR: 'errorFlow',
				MFA: 'mfaState',
				FIXED: 'successState'
			}],
			transitionState: 'formLoading',
			async: function (form) {
				this.sitesMfa = new SiteMFA(form);
				return this.sitesMfa.serverCreate();
			},
			onResolve: function () {
				return this.sitesMfa.getPostResult();
			},
			after: function () {
				switch(this.state.get('current')) {
					case 'successState':
						return this.mfaSuccess();
					case 'errorFlow':
						return this.getError(this.sitesLink.get('siteLinkResult').siteId);
				}
			}
		},
		mfaSuccess: {
			fromTo: ['successState', 'initial'],
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