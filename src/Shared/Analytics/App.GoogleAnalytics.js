define(function (require){
	'use strict';

	var _ = require('underscore');
	var ErrorInstance = require('error');
	// var TrackTiming = require('Shared/Utils/TrackTiming');

	// Handle Google Analytics Tracking
	function GoogleAnalytics (options){
		this.gaq = options.environment.ga.gaq;
		this.ga_enabled = options.environment.ga.enabled;
		this.accountId = options.environment.ga.accountId;

		if(this.ga_enabled){
			if (!_.isArray(this.gaq)) {
				throw new ErrorInstance('GoogleAnalyticsNotFoundError', 'window._gaq not present');
			}
			this.initialize();
		}
		return this;
	}
	GoogleAnalytics.prototype = {
	    initialize: function (){
		    this.gaq.push(['_setAccount', this.accountId]);
		    this.gaq.push(['_trackPageview']);
		    this.appendScript();
	    },
	    appendScript: function (){
		    var ga = document.createElement('script');
		    ga.type = 'text/javascript';
		    ga.async = true;
		    ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(ga, s);
	    },
	    pushToGA: function (key, value, queued){
		    debug.info('Google Analytics (' + key + ', ' + value + ')');
		    this.gaq.push([key, value]);
	    },
	    // Track the users page views
	    //
	    // In the event of window._gaq not being present, will push the events to a queue that will wait until a
	    // future
	    // call where the global is available and will fire all at that point in time
	    trackPageView: function (page){
		    if (this.ga_enabled) {
			    this.pushToGA('_trackPageview', page);
		    }
		    return this;
	    },
	    trackTiming: function (category, variable, time, opt_label, opt_sample){
		    // if (this.ga_enabled) {
		    // var timing = new TrackTiming();
		    //
		    // timing.startTime();
		    //
		    // // var totalTime = timing.
		    //
		    // this.gaq.push('_trackTiming', category, variable, time, opt_label, opt_sample);
		    // debug.info('GA XHR Request Timing (' + totalTime + ')');
		    // }
		    // return this;
	    }
	};
	return GoogleAnalytics;
});