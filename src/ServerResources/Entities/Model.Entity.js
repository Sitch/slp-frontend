define(function (require) {
	'use strict';

	var CacheableModel = require('Shared/Cache/Model.Cacheable');
	var ContactModel = require('../Model.Contact');

	var EntityModel = CacheableModel.extend({
		url: function(){
			return '/api/entity';
		},
		initialize: function(){
			this.register('entity');
		}
// 		parse: function (response) {

// 			var accounts = App.Cache.get('accounts');

// 			this.set('account', accounts.get(response.accountID));
// 			// this.set('extPos', response.name.lastIndexOf('.') + 1);


// 			var extension = response.name.split('.').shift();
// 			this.set('extension', response.name === extension ? extension : '');

// 			switch (response.type) {
// 			case "email-contact":
// 			case "google-contact":

// 				this.set('contact', new ContactModel(response));
// 				break;
// 				// response.fileTypeIcon = icons.get(fileType).get('icon');

// 			case "google-drive-file":
// 			case "email-attachment":
// 			case "dropbox-file":
// 			case "desktop-file":
// 				App.Cache.get('fileTypes').find(function(model){
// 					if(_.contains(model, extension)){

// 					}

// 				});

// 				break;
// 			case "gmail-email":
// 			case "imap-email":
// 			case "exchange-email":
// 				fileType = "email";
// 				break;
// 			}

// 			var overrides = {
// 				prettyType: response.type.replace(/-?(\w+)/gi, function (_, word) {
// 					return word.substr(0, 1).toUpperCase() + word.substr(1) + ' ';
// 				}),
// 				prettyTime: (response.lastModifiedTime !== 0) ? moment(response.lastModifiedTime).fromNow() : '',
// 				formattedTime: (response.lastModifiedTime !== 0) ? moment(response.lastModifiedTime).format('MM/DD/YYYY h:mma') : '',
// 				addToTaskURL: '/tasks/incomplete?entityUUID=' + response.uuid,
// 				url: (response.url) ? response.url : '/entity/',
// 				response.type,
// 				'/',
// 				response.uuid].join('')
// 		}
// d
// 		return response;
	});

});