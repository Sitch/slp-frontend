define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var CacheableModel = require('Shared/Cache/Model.Cacheable');

	var AuthModel = CacheableModel.extend({
		// defaults: {
		// 	id: '',
		// 	username: '',
		// 	password: '',
		// 	remember: '',
		// 	session: ''
		// },
		writeOnly: true,
		url: function () {
			return '../api/login';
		},
		initialize: function () {
			this.register('auth');
		},
		setSession: function () {
			var session = $.cookie('slp-session');
			this.set('session', session);
			App.env.session = session;
		}
	});
	return AuthModel;
});