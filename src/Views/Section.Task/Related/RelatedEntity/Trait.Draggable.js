define(function(require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Handlebars = require('handlebars');

	var $draggable = require('jqueryui/draggable');
	var $droppable = require('jqueryui/droppable');

	var DraggableModel = require('./Model.Draggable');
	var template = require('text!./Template.EntityDrag.html');

	// Create the draggable behavior object
	return {
		uiDraggable: {
			dragSection: 'div'
		},
		initializeDraggable: function() {
			_.extend(this.ui, this.uiDraggable);
			this.listenTo(this.model, 'drag:saving:start', this.dragSavingStart, this);
			this.listenTo(this.model, 'drag:saving:complete', this.dragSavingClear, this);

			this.draggable = new DraggableModel();
			this.bindTo(this.draggable, 'change:draggable', this.handleDraggable, this);

			this.bindTo(this, 'render', this.createDraggable, this);
			this.bindTo(this, 'close', this.destroyDraggable, this);
		},
		handleDraggable: function() {
			if(this.draggable.get('draggable')) {
				this.enableDraggable();
			} else {
				this.disableDraggable();
			}
		},

		createDraggable: function() {
			this.ui.dragSection.draggable(this.getDraggableConfig());
		},

		/** 
		 * Keep this callback in a named funciton so specific behaviors (tablets, phones) 
		 * can override it with their own dragstart/stop callbacks.
		 */
		dragTrigger: function (evt) {
			App.vent.trigger('transaction:draggable:' + evt.type);

			if (this.parentView.selectable.get('selection').length === 1 && evt.type === 'dragstop') {
			    this.parentView.closeOtherTransactionDetails();
				this.parentView.deselectAllTransactions();
			}
	    },

		/** 
		 * Return this object from a funciton so specific behaviors (tablets, phones) 
		 * can override it with their own config options
		 */
		getDraggableConfig: function () {
			return {
				appendTo: 'body',
				addClasses: false,
				helper: this.dragHelper,
				refreshPositions: true,
				scroll: false,
				delay: 100,
				start: this.dragTrigger,
				stop: this.dragTrigger,
				cursorAt: {
					right: 85,
					top: 30
				}
			};
		},

		destroyDraggable: function() {
			this.ui.dragSection.draggable('destroy');
		},
		enableDraggable: function() {
			this.ui.dragSection.draggable('enable');
		},
		disableDraggable: function() {
			this.ui.dragSection.draggable('disable');
		},
		dragHelper: function(event, ui) {
			if(this.parentView.selectable.hasNone()) {
				this.selectTransaction();
			}
			var selected = this.parentView.selectable.get('selection').models;
			var total = selected.length;

			return Handlebars.compile(template)({
				title: (total === 1) ? StringUtils.truncate(selected[0].get('description'), 25) : 'Transactions',
				total: total,
				models: _.map(selected, function(model) {
					return model.get('transactionId');
				}),
				notSingle: total !== 1,
				transName: _.map(selected, function(model) {
					return model.get('description').substring(0, 27) + "...";
				}),
				dollars: (function() {
					var amount = Currency.add(_.map(selected, function(model) {
						return model.get('isCredit') ? -1 * model.get('amount') : Math.abs(model.get('amount'));
					}));

					return {
						amount:  Math.abs(amount),
						green: amount < 0
					};
				})()
			});
		},
		dragSavingStart: function() {
			this.$el.addClass('saving');
		},
		dragSavingClear: function() {
			this.$el.removeClass('saving');

			App.vent.trigger("river:refresh:drag");
		}
	};
});