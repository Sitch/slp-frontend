define(['jquery', 'underscore', 'jquery.cookie'], function ($, _, cookie) {
	'use strict';

	var env = {

		// AJAX Header
		header: {
			accept: 'application/json',
			contentType: 'application/json'
		},
		// Services
		serviceVersion: 'v1',
		serverRoot: '',
		servicesBaseURI: 'api',
		services: {
			account: 'account',
			accounts: 'accounts',
			formData: 'formData',
			formSchema: 'form/schema',
			user: 'user'
		},
		// Locale
		locale: {

		},

		// AJAX Pollers
		pollers: {

		},
		// Analytics
		analytics: {
			enabled: false,
			useQueue: true,
			queueInterval: 3000
		},
		// Caching
		cache: {
			enabled: true,
			cacheBuster: false
		},
		// Google Analytics
		ga: {
			accountId: '',
			enabled: false,
			varName: '_gaq'
		},
		// Debugging
		debug: {
			enabled: false
		}
	};

	/*
	 * URL = http://[serverRoot]/[servicesBaseURI]/[services]
	 *
	 * cache: Controls whether backbone will cache models
	 *
	 * debug: Controls whether the debug-console is enabled or disabled
	 *
	 */

	return function (envOverride, global) {

		// Extend override with Environment Settings
		_.merge(env, envOverride);

		var root = env.serverRoot;
		var base = env.servicesBaseURI;
		var services = env.services;
		var version = env.serviceVersion;

		_.each(_.keys(services), function (service) {
			services[service] = [root, base, version, services[service]].join('/');
		});

		// Environment Setting Cookies
		var cookie = {
			debug: $.cookie('slp-debug'),
			session: $.cookie('slp-session')
		};
		env.session = cookie.session;

		// AJAX
		$.ajaxSetup({
			beforeSend: function (xhr, settings) {
				xhr.setRequestHeader('Accept', env.header.accept);
			
				if (settings.type === 'PUT' || settings.type === 'POST') {
					xhr.setRequestHeader('Content-Type', env.header.contentType);
				}
			},
			cache: !env.cache.cacheBuster
		});

		// Debugging
		if (!(cookie.debug || env.debug.enabled) || !global.console) {
			global.console = {
				log: function () {}
			};
			if (_.isFunction(debug.setLevel)) {
				debug.setLevel(0);
			}
		}

		// Cache Buster
		if (env.cache.cacheBuster) {
			require.config({
				urlArgs: '_=' + (+new Date())
			});
		}

		// Goggle Analytics
		env.ga.gaq = global._gaq = [];

		return env;
	};
});