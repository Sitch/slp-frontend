define(function (require) {
	'use strict';

	var _ = require('underscore');
	var Backbone = require('backbone');
	var FolderModel = require('./Model.Folder');

	var FoldersCollection = Backbone.Collection.extend({
		model: FolderModel,
		url: function(){
			return '/api/browse';
		},
		rootNodes: [],
		accountID: null,
		setAccountID: function (accountID) {
			this.accountID = accountID;
		},
		getAccountID: function (accountID) {
			console.log('accountID', accountID);
			return this.accountID;
		},
		parse: function (response) {
			return response.data;
		},
		findBy: function (prop, value) {
			return this.find(function (model) {

				var altered;
				var unalertered;
				var len;

				unalertered = altered = model.get(prop);
				len = unalertered.length;

				if (unalertered.charAt(len - 1) === "/") {
					altered = unalertered.substr(0, len - 1);
				}
				return altered === value;
			});
		},
		buildDirectory: function () {

			this.rootNodes = [];

			this.each(function (folder) {

				var temp = this.rootNodes;
				var path = folder.get('container');
				var heirarchy = path.split('/');

				_.each(heirarchy, function (level, i) {

					var pos = _.pluck(temp, 'name').indexOf(level);
					var path = heirarchy.slice(0, (i + 1)).join('/');
					var exists;
					var uuid;
					var len;

					if (level === "") {
						return 0;
					}

					if (pos === -1) {

						exists = this.findBy('container', path);

						if (!exists) {
							exists = this.add({
								uuid: md5(path),
								path: path,
								container: path
							});
							exists = this.findBy('container', path);
						}

						uuid = exists.get('uuid');

						len = temp.push({
							name: level,
							uuid: uuid,
							children: []
						});
						pos = len - 1;
					}

					temp = temp[pos].children;

				}, this);
			}, this);
		}
	});
	return FoldersCollection;

});