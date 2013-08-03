define(function (require) {
	'use strict';

	var _ = require('underscore');

	var defaults = {
		displayText: ':name',
		editText: 'Re-validate',
		showInSettings: true,
		showIn: true
	};
	var overrides = _.map({
		// Email
		'attachments': {
			displayText: ':attachments',
			showInSettings: false
		},
		'exchange': {
			displayText: ':email',
			editText: 'Edit'
		},
		'imap': {
			displayText: ':email',
			editText: 'Edit'
		},
		// People
		'google-contacts': {
			showInSettings: false,
			showIn: false
		},
		// Calendar
		'google-calendar': {
			showInSettings: false,
			showIn: false
		}

	}, function (accountType) {
		return _.extend({}, defaults, accountType);
	});

	return function applyAccountViewDefault(account) {
		return _.extend(overrides[account.type] || defaults, account);
	};
});