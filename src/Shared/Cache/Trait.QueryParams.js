define(function(require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var ErrorInstance = require('error');

	return {
		url: function() {
			var encodedQuery = this.flattenQueryParams(this.getQueryParams());
			return App.environment.services[this.getService()] + (encodedQuery ? '/?' + encodedQuery : '');
		},
		generateCacheKey: function(service, id) {
			var timestamp = +new Date();
			return [service, id, timestamp].join('-');
		},
		getService: function() {
			return this.service;
		},
		setService: function(service) {
			this.service = service;
		},
		getQueryParams: function() {
			return this.queryParams;
		},
		setQueryParams: function(params) {
			this.queryParams = params;
		},
		addQueryParams: function(params) {
			_.extend(this.queryParams, params);
		},
		flattenQueryParams: function(params) {
			var value;
			var key;
			var stack = [];

			for(var unencodedKey in params) {
				if(params.hasOwnProperty(unencodedKey)) {
					key = encodeURIComponent(unencodedKey);
					value = params[unencodedKey];

					if(_.isNull(value) || _.isUndefined(value) || value === '') {
						continue;
					}
					if(_.isArray(value)) {
						_.each(_.compact(value), function(item) {
							stack.push(key + '=' + encodeURIComponent(item));
						});
					} else {
						stack.push(key + '=' + encodeURIComponent(value));
					}
				}
			}
			return stack.join('&');
		},
		register: function(service, params) {
			if(!this.hasRegistered) {
				_.bindAll(this);
				this.setService(service);
				this.setQueryParams(params || {});
				this.hasRegistered = true;
			}
		},
		create: function() {
			throw new ErrorInstance('InvalidFunctionInvocation', 'Cannot call backbone methods when using cacheable');
		},
		fetch: function() {
			throw new ErrorInstance('InvalidFunctionInvocation', 'Cannot call backbone methods when using cacheable');
		},
		save: function() {
			throw new ErrorInstance('InvalidFunctionInvocation', 'Cannot call backbone methods when using cacheable');
		},
		destroy: function() {
			throw new ErrorInstance('InvalidFunctionInvocation', 'Cannot call backbone methods when using cacheable');
		}
	};
});