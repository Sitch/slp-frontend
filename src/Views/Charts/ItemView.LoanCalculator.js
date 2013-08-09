define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');
	var d3ignore = require('d3');
	var nvd3 = require('nvd3');

	var Rainbow = require('Views/Palette.Rainbow');

	var LoanCalculator = Backbone.Marionette.ItemView.extend({
		template: Template.LoanCalculator,
		events: {
			// controls
			'click .update': 'updateController'
		},
		initialize: function (options) {
			this.palette = new Rainbow();
			this.accounts = this.cache.get('accounts');
		},
		updateController: function (event) {
			var until = null;
			// until = Math.random(0, 200);

			var data = this.accounts.projectAggregate(until);
			this.update(data);
		},
		update: function (data) {
			this.palette.reset();

			_.each(data, function (row) {
				row.color = this.palette.get();
			}, this);

			this.$chart
				.datum(data)
				.transition().duration(500).call(this.chart);
		},
		draw: function () {
			var self = this;
			var data = this.accounts.projection();

			this.$chart = d3.select('#chart svg');

			var chart = this.chart = nv.models.stackedAreaChart()
				.x(function (d) {
					return d[0];
				})
				.y(function (d) {
					return d[1];
				})
				.clipEdge(true);

			// this.chart.showLegend(false);
			// this.chart.showControls(false);

			chart.xAxis.tickFormat(function (d) {
				return d3.time.format('%x')(new Date(d));
			});

			chart.yAxis.tickFormat(d3.format(',.2f'));

			self.update(data);

			nv.utils.windowResize(self.chart.update);

			nv.addGraph(self.chart);
		},
		onShow: function () {
			this.draw();
		}
	});
	return LoanCalculator;
});