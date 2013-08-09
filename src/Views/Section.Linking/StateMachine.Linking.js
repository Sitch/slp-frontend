define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var BackboneStateMachine = require('./StateMachine');
	var Poller = require('Poller/Poller');

	var Sites = require('../Collections/Collection.Sites');

	var SearchFlow = require('./StateMachine.Flow.Search');
	var RefreshFlow = require('./StateMachine.Flow.Refresh');
	var ErrorFlow = require('./StateMachine.Flow.Error');

	function LinkManager() {
		this.instances = [];
		this.interval = 5000;
		this.sitesRefresh = new Sites();
		this.numOfErrors = 0;

		this.refreshPoller = new Poller(this.refresh, this.interval, this);
		this.refreshPoller.start();
		debug.info('REFRESH-POLLER :    (Started)    :');
		return this;
	}
	LinkManager.prototype = {
		create: function (optionalInitial) {
			var fsm = this.stateMachineFactory(optionalInitial);
			this.instances.push(fsm);
			return fsm;
		},
		remove: function (instance) {
			this.instances = _.filter(this.instances, function (item) {
				return item !== instance;
			});
			if(!this.instances.length) {
				this.refreshPoller.stop();
			}
			return this;
		},
		reset: function () {
			this.refreshPoller.stop();
			this.instances = [];
			return this;
		},
		refresh: function () {
			debug.info('REFRESH-POLLER :    (Refreshing)    :');
			var self = this;
			$.when(this.sitesRefresh.serverRead()).then(function () {
				if(!self.hasPolled) {
					self.numOfErrors = self.sitesRefresh.numOfErrors();
				}
				if(self.sitesRefresh.isAllRefreshed()) {
					if(self.refreshPoller.pollCount > 1){
						App.CacheManager.invalidateAll().refresh();
					}
					debug.info('REFRESH-POLLER :   (Stopped)    :');
					self.refreshPoller.stop();
				}
			});
		},
		stateMachineFactory: function (optionalInitial) {
			return new BackboneStateMachine({
				initial: optionalInitial ? optionalInitial : 'initial',
				transitions: _.extend({}, SearchFlow, RefreshFlow, ErrorFlow)
			});
		}
	};
	return LinkManager;
});