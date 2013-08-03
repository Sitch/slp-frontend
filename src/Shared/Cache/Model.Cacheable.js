define(function (require) {
	'use strict';

	var _ = require('underscore');
	var Backbone = require('backbone');
	var QueryParamsTrait = require('./Trait.QueryParams');
	var ErrorInstance = require('error');

	return Backbone.Model.extend(_.extend({

		_toJSON: Backbone.Model.prototype.toJSON,

		// CREATE
		serverCreate: function (options) {
			var dataFormat = this.toJSONCreate || this._toJSON;
			var urlFormat = this.urlCreate || this.url;

			return this.crud('create', dataFormat, urlFormat, options);
		},
		// READ
		serverRead: function (options) {
			var dataFormat = this.toJSONRead || this._toJSON;
			var urlFormat = this.urlRead || this.url;

			return this.crud('read', dataFormat, urlFormat, options);
		},
		// UPDATE
		serverUpdate: function (options) {
			var dataFormat = this.toJSONUpdate || this._toJSON;
			var urlFormat = this.urlUpdate || this.url;

			return this.crud('update', dataFormat, urlFormat, options);
		},
		// DELETE
		serverDelete: function (options) {
			var dataFormat = this.toJSONDelete || this._toJSON;
			var urlFormat = this.urlDelete || this.url;

			return this.crud('delete', dataFormat, urlFormat, options);
		},
		// CRUD Abstract
		crud: function (method, dataFormat, urlFormat, options) {
			options = options ? _.clone(options) : {};

			var url = this.url;
			var toJSON = this.toJSON;

			var model = _.extend(this, {
				toJSON: dataFormat,
				url: urlFormat
			});
			var success = options.success;
			var error = options.error;

			var that = this;

			_.extend(options, {
				success: function (response, status, xhr) {

					_.extend(that, {
						toJSON: toJSON,
						url: url
					});

					var attrs = model.parse(response, xhr);
					if (!model.set(_.isArray(attrs) ? attrs.shift() : attrs, options)) {
						return false;
					}
					if (method !== 'read') {
						App.Cache.invalidateDependencies(method, model.service);
					}
					if (_.isFunction(success)) {

						success(model, response);
					} else if (method !== 'read') {
						model.trigger('sync', model, response, options);

					}
				}
				// ,error: Backbone.wrapError(error, model, options)
			});
			this.deferred = Backbone.sync.call(model, method, model, options);
			return this.deferred;
		}
	}, QueryParamsTrait));
});