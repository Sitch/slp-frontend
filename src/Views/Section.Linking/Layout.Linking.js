define(function (require) {
	'use strict';
	//DEPENDENCIES
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var template = require('text!./Template.Linking.html');

	//ACCOUNT DRAWER
	var DrawerModel = require('./Views/AccountDrawer/Model.AccountDrawer');
	var AccountDrawer = require('./Views/AccountDrawer/Layout.Drawer');
	var StatusBar = require('./Views/AccountDrawer/Layout.StatusBar');

	//MAIN MODULES
	var SearchModule = require('./Views/Search/Layout.Search');
	var LoginModule = require('./Views/Login/Layout.Login');
	var AddManualModule = require('./Views/AddManualAccount/Layout.AddManualAccount');

	//LOADING VIEWS
	var SimpleLoadingView = require('./Views/SimpleLoadingView/View.Loading');
	var LoadingView = require('./Views/LoadingView/View.Loading');
	var LoadingSuccessView = require('./Views/LoadingView/View.Success');

	//MFA MODULE
	var MfaModule = require('./Views/MFA/Layout.MFA');

	//ERROR FLOW MODULES
	var FixErrorAgain = require('./Views/Error/Layout.NewError');
	var ErrorSuccess = require('./Views/Error/Layout.ErrorSuccess');
	var ErrorModule = require('./Views/Error/Layout.Error');
	var ErrorLoadingView = require('./Views/LoadingView/View.ErrorLoad');
	var ErrorNoAction = require('./Views/Error/Layout.ErrorNoAction');

	var configMap = {
		initial: {
			hasDrawer: true,
			canClose: true,
			route: 'linking/search'
		},
		displayLoginForm: {
			hasDrawer: true,
			canClose: true,
			route: 'linking/login'
		},
		formLoading: {
			hasDrawer: false,
			canClose: false,
			route: 'linking/form'
		},
		simpleLoading: {
			hasDrawer: true,
			canClose: false,
			route: false
		},
		successState: {
			hasDrawer: false,
			canClose: false,
			route: 'linking/success'
		},
		addManual: {
			hasDrawer: true,
			canClose: true,
			route: 'linking/add'
		},
		mfaState: {
			hasDrawer: true,
			canClose: true,
			route: 'linking/mfa'
		},
		errorState: {
			hasDrawer: true,
			canClose: true,
			route: 'linking/error'
		},
		errorFlow: {
			hasDrawer: true,
			canClose: true,
			route: 'linking/error'
		},
		errorLoading: {
			hasDrawer: false,
			canClose: false,
			route: 'linking/error/loading'
		},
		errorFlowSuccess: {
			hasDrawer: true,
			canClose: true,
			route: 'linking/error/success'
		},
		newErrorFlow: {
			hasDrawer: true,
			canClose: true,
			route: 'linking/error'
		},
		noActionError: {
			hasDrawer: true,
			canClose: true,
			route: 'linking/error/no-action'
		}
	};

	return Marionette.Layout.extend({
		template: template,
		className: 'linking-modal',
		regions: {
			main: '#linkingModal_left',
			statusBar: '#statusBar_container',
			drawer: '#account_drawer'
		},
		triggers: {
			'click #closeLinking': '_track:click:linking_modal:close_modal',
			'click #linking-errorTooltip': 'click:linking_modal:toggleErrorTooltip'
		},
		ops: {
			"drawerStartSize": 40,
			"isSignupFlow": false
		},
		constructorMap: {
			initial: SearchModule,
			displayLoginForm: LoginModule,
			formLoading: LoadingView,
			simpleLoading: SimpleLoadingView,
			successState: LoadingSuccessView,
			addManual: AddManualModule,
			mfaState: MfaModule,
			errorState: ErrorModule,
			errorFlow: FixErrorAgain,
			errorLoading: ErrorLoadingView,
			errorFlowSuccess: ErrorSuccess,
			newErrorFlow: FixErrorAgain,
			noActionError: ErrorNoAction
		},
		initialize: function (options) {
			_.bindAll(this);
			this.options = options || {};
			this.fadeDuration = 400;

			this.section = window.location.hash.split('/').shift();

			/* Prevents the modal from closing unless user clicks keep alive button */
			$('#modal').on('hide.learnvest:modalcloseprevent', this.preventClose);

			this.drawerModel = new DrawerModel();
			this.launchError = this.options.errorId || false;

			this.stateMachine = App.LinkManager.create();

			//If modal is launched to Fix Error
			if(this.launchError) this.stateMachine.getError(this.launchError);

			if(this.ops.isSignupFlow) this.signupFlowInitialize();

			this.bindTo(this, '_track:click:linking_modal:close_modal', this.hideModal, this);
			this.bindTo(this, 'click:linking_modal:toggleErrorTooltip', this.toggleError, this);
			this.bindTo(this.stateMachine.state, 'change', this.onStateChange, this);
			this.bindTo(this.drawerModel, 'change:drawerOpen', this.manageDrawer, this);
			this.bindTo(App.LinkManager.sitesRefresh, "reset", this.manageState, this);
		},
		getViewConstructor: function () {
			if(this.constructorMap.hasOwnProperty(this.stateMachine.state.get('current'))) {
				return this.constructorMap[this.stateMachine.state.get('current')];
			}
		},
		getViewRoute: function () {
			var route = '';
			if(configMap.hasOwnProperty(this.stateMachine.state.get('current'))) {
				route = configMap[this.stateMachine.state.get('current')].route;
			}
			return route ? _.compact([this.section, route]).join('/') : false;
		},
		hasDrawer: function () {
			if(configMap.hasOwnProperty(this.stateMachine.state.get('current'))) {
				return !!configMap[this.stateMachine.state.get('current')].hasDrawer;
			}
		},
		canCloseModal: function () {
			if(configMap.hasOwnProperty(this.stateMachine.state.get('current'))) {
				return !!configMap[this.stateMachine.state.get('current')].canClose;
			}
		},
		manageState: function(){
			if(this.hasDrawer() && App.LinkManager.sitesRefresh.hasAccounts() && !this.statusBar.currentView) {
				this.drawerShow();
			}else if(!App.LinkManager.sitesRefresh.hasAccounts()){
				this.statusBar.close();
				this.drawer.close();
				this.$("#linking-errorTooltip").hide();
			}
		},
		onStateChange: function(isLoading){
			var Constructor = this.getViewConstructor();
			var route = this.getViewRoute();

			this.toggleCloseButton();

			if(Constructor) {
				this.main.show(new Constructor({
					stateMachine: this.stateMachine,
					ops: this.ops
				}));
			}

			if(route) {
				App.Router.navigate(route, {
					trigger: false,
					replace: false
				});
			}

			if(this.hasDrawer() && App.LinkManager.sitesRefresh.hasAccounts()) {
				this.drawerShow();
			} else {
				this.statusBar.close();
				this.drawer.close();
				this.$("#linking-errorTooltip").hide();
			}
		},
		drawerShow: function(){
				this.statusBar.show(new StatusBar({
					model: this.drawerModel,
					containEl: this.className,
					layoutOptions: this.ops
				}));
				this.drawer.show(new AccountDrawer({
					model: this.drawerModel,
					stateMachine: this.stateMachine,
					containEl: this.className
				}));
		},
		onShow: function () {
			this.onStateChange();
		},
		toggleError: function (e) {
			$(e.currentTarget).fadeOut(function () {
				App.vent.trigger("linkingFlow:toggleDrawer");
			});
		},
		toggleCloseButton: function () {
			var el = $("#closeLinking");
			if(!this.canCloseModal()) {
				if(el.is(":visible")) el.hide();
			} else {
				if(!el.is(":visible")) el.show();
			}
		},
		preventClose: function (e) {
			if(!this.canCloseModal()) {
				e.preventDefault();
				e.stopPropagation();
			}
		},
		hideModal: function (e) {
			e.preventDefault();
			e.stopPropagation();

			if(this.ops.isSignupFlow){
				this.stateMachine.goToInitial();
			}else{
				App.modal.hideModal();
			}
		},
		onClose: function () {
			$('#modal').off('hide.learnvest:modalcloseprevent', this.preventClose);

			if(App.environment.launchWithLinking) App.environment.launchWithLinking = null;

			if(window.location.pathname.indexOf('signup') < 0){
				App.Router.navigate(this.section, {
					trigger: false
				});
			}
		}
	});
});