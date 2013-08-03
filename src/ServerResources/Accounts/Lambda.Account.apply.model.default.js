define(function (require) {
	'use strict';

	var _ = require('underscore');

	var defaults = {
		entitytypes: '',
		foldertypes: []
	};
	var overrides = _.map({
		// Storage
		'dropbox': {
			href: '/browse/files/:id',
			entitytypes: 'dropbox-file',
			foldertypes: ['dropbox-folder']
		},
		'google-drive': {
			href: '/browse/files/:id',
			entitytypes: 'google-drive-file',
			foldertypes: ['google-drive-folder']
		},
		// Documents
		'evernote': {
			href: '/browse/notes/:id',
			entitytypes: 'evernote-note',
			foldertypes: ['evernote-notebook']
		},
		// Email
		'attachments': {
			href: '/browse/files/attachments',
			entitytypes: 'email-attachment'
		},
		'exchange': {
			href: '/browse/email/:id',
			entitytypes: 'exchange-email',
			foldertypes: ['exchange-folder', 'exchange-category']
		},
		'gmail': {
			href: '/browse/email/:id',
			entitytypes: 'gmail-email',
			foldertypes: ['gmail-label']
		},
		'imap': {
			href: '/browse/email/:id',
			entitytypes: 'imap-email',
			foldertypes: ['imap-folder']
		},
		// People
		'google-contacts': {
			entitytypes: 'google-contacts'
		},
		// Tasks
		'google-tasks': {
			href: '/browse/notes/:id',
			entitytypes: 'google-task'
		},
		// Calendars
		'google-calendar': {
			entitytypes: 'google-calendar-event'
		},
		// Desktop Applications
		'mac-desktop': {
			href: '/browse/files/:id',
			foldertypes: ['desktop-folder']
		},
		'windows-desktop': {
			href: '/browse/files/:id',
			foldertypes: ['desktop-folder']
		}
	}, function (accountType) {
		return _.extend({}, defaults, accountType);
	});

	return function applyAccountModelDefault(account) {
		return _.extend(overrides[account.type] || defaults, account);
	};
});