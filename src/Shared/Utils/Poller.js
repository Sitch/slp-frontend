define(function (require) {
	'use strict';

	var _ = require('underscore');
	var ErrorInstance = require('error');

	function Poller(callback, interval, context) {
		if (!_.isFunction(callback)) {
			throw new ErrorInstance('InvalidArgumentException',
				'Poller requires a callback function');
		}
		this.setInterval(interval);
		this.callback = callback;
		this.context = context || null;
		this.timeout = null;
		this.result = null;
		this.pollCount = 0;
		return this;
	}
	Poller.prototype = {
		setInterval: function (interval) {
			if (!_.isNumber(interval)) {
				throw new ErrorInstance('InvalidArgumentException',
					'Poller requires a numeric interval');
			}
			this.interval = interval;
		},
		start: function () {
			if (!this.isPolling()) {
				this.continuePolling = true;
				this.result = this.callback.call(this.context);
				this.poll();
			}
			return this;
		},
		stop: function () {
			if (this.timeout) {
				clearTimeout(this.timeout);
				this.timeout = null;
			}
			this.continuePolling = false;
			return this;
		},
		restart: function () {
			if (this.isPolling()) {
				this.stop();
				this.start();
			} else {
				this.start();
			}
		},
		isPolling: function () {
			return !!this.continuePolling;
		},
		updateInterval: function (interval) {
			if (this.interval !== interval) {
				this.stop();
				this.setInterval(interval);
				this.start();
			}
			return this;
		},
		poll: function () {
			var self = this;
			if (this.isPolling()) {
				this.pollCount = this.pollCount + 1;
				this.timeout = setTimeout(function () {
					self.result = self.callback.call(self.context);
					if (self.continuePolling) {
						self.poll();
					}
				}, this.interval);
			}
		},
		getResult: function () {
			return this.result;
		}
	};
	return Poller;
});