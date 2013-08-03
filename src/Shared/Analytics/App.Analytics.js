  define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var ErrorInstance = require('error');
	var debug = require('debug');

	var Poller = require('Shared/Utils/Poller');

	// var TrackTiming = require('Mixins/TrackTiming');

	// Handle Internal Analytics Tracking

	function Analytics(options) {


		_.extend(this, options.environment.analytics);
		this.url = options.environment.services.analytics;
		// this.multipleUrl = options.environment.services.analyticsBatch;

		this.initialTime = + new Date();
		this.eventQueue = [];

		// if (this.useQueue && this.enabled) {
		// 	this.initQueue();
		// }

	}

	Analytics.prototype = {



		// addToQueue 
		// Add an event data object to the queue. Calculate a time offset for it in milliseconds based on the initial captured time.

		enqueue: function (data) {
			if (!this.enabled) {
				return false;
			}

			if (this.initialTime === null) {
				this.initialTime = new Date().getTime();
				data.offsetTime = 0;
			} else {
				data.offsetTime = new Date().getTime() - this.initialTime;
			}

			if (App.SignupFlow) {
				data.eventData.formId = App.Overridely.overrides.version;
			}

			this.eventQueue.push(data);
			debug.info('<ANALYTICS> add to queue', data);
		},

		// processQueue
		// Send the contents of the event queue to /api/tracks via a POST and reset the initial timestamp for offsets.

		processQueue: function () {
			var self = this;

			if (this.eventQueue.length) {

				debug.info('<ANALYTICS> process queue after ' + this.queueInterval + 'ms ',
					this.eventQueue ? this.eventQueue : '[no events]');
				// TODO: post data to server

				var data = {
					timeStamp: this.initialTime,
					events: this.eventQueue
				};

				var queueJSON = JSON.stringify(data);

				this.initialTime = null;

				$.ajax({
					url: this.multipleUrl,
					type: 'POST',
					data: queueJSON,
					dataType: 'json',
					success: _.bind(this._log, {
						result: 'queue send success',
						data: data
					}),
					error: _.bind(this._log, {
						result: 'queue send failure',
						data: data
					})
				});

				delete this.eventQueue;
				this.eventQueue = [];
			}

		},

		// postToServer
		// Send a single event data object to /api/track via a POST.

		postToServer: function (data) {
			var self = this;

			$.ajax({
				url: this.url,
				type: 'POST',
				data: JSON.stringify(data),
				dataType: 'json',
				success: _.bind(this._log, {
					result: 'success',
					data: data
				}),
				error: _.bind(this._log, {
					result: 'failure',
					data: data
				})
			});
		},

		_log: function () {
			if (this.data) {
				var eventData = _.reduce(this.data.eventData, function (memo, value) {
					memo.push(value);
					return memo;
				}, []);

				debug.info(['<ANALYTICS> (' + this.result + ')', this.data.eventType].concat(eventData).join(' : '));
			}

		},

		decomposeTrigger: function (trigger, event) {

			var t = trigger.split(':');

			var triggerData = {
				prefix: t.shift(),
				data: {
					eventType: t.shift(),
					eventData: {
						section: t.shift(),
						name: t.shift()
					}
				}
			};

			if (event && event.pageX && event.pageY) {
				_.extend(triggerData.data.eventData, {
					coords: [event.pageX, event.pageY],
					type: event.type
				});
				if (!this.useQueue)
					triggerData.data.eventData.timeStamp = event.timeStamp;
			}
			return triggerData;
		},

		// trackEvent
		// Manually send an event to the server with the specified type and an optional data object.
		//
		// Specify immediate parameter as true to bypass the event queue and send the event directly to the server.
		//
		// Example keys for data object:
		//
		// section, name, page

		trackEvent: function (type, data, immediate) {
			if (!data) {
				data = {};
			}

			var triggerData = {
				eventType: type,
				eventData: data
			};

			this.prepareEvent(triggerData, immediate);
		},


		// prepareEvent
		// Add an event to the queue or to the server, depending on settings. 
		// 
		// If options.useQueue = false or if the immediate parameter is passed as true, the event is sent straight to the server.

		prepareEvent: function (data, immediate) {

			if (this.useQueue && !immediate) {
				this.addToQueue(data);
			} else {
				this.postToServer(data);
			}

		},

		// dispatchTrigger
		// Calls to this should be made in the format of:
		// '_track:{eventType}:{section}:{name}'

		dispatchTrigger: function (trigger, event, context) {

			var triggerObj = this.decomposeTrigger(trigger, event);

			// Filter and process triggers that begin with _track
			if (this.enabled && triggerObj.prefix === '_track') {

				// Look up trigger in triggerCodeMap to see if a custom block for handling the trigger exists
				if (this.triggerCodeMap.hasOwnProperty(trigger)) {

					// Execute that custom block if it exists
					this.triggerCodeMap[trigger].apply(context || null);

				} else if (this.triggerCodeMap.hasOwnProperty(triggerObj.data.eventType)) {

					this.triggerCodeMap[triggerObj.data.eventType].apply(context || this, [trigger, triggerObj, event]);

				} else {

					// Otherwise, send it to the server as-is
					this.prepareEvent(triggerObj.data);
				}

				// debug.info('ANALYTICS (trigger): ', trigger);
			}

		},

		dispatchEvent: function (event) {
			/*
			 * if (this.enabled) { var e = event[0]; // var html = $(e.target)[0].outerHTML; var coords = [e.pageX,
			 * e.pageY]; var type = e.type; var timestamp = e.timeStamp;
			 *
			 * debug.info('ANALYTICS (event): ', [type, '(' + coords.join(',') + ')', new Date(timestamp)].join(':')); }
			 */
		}
	};
	return Analytics;
});