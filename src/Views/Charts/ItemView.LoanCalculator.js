define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Template = require('templates');
	var d3ignore = require('d3');
	var nvd3 = require('nvd3');

	var LoanCalculator = Backbone.Marionette.ItemView.extend({
		template: Template.LoanCalculator,
		events: {
			// controls
			'click .update': 'update'
		},
		initialize: function (options) {
			this.accounts = this.cache.get('accounts');
		},
		update: function (event) {

			var until = null;
			// until = Math.random(0, 200);

			var data = this.accounts.projectAggregate(until);
			this.$chart
				.datum(data)
				.transition().duration(500).call(this.chart);
		},
		draw: function () {
			var self = this;
			var data = this.accounts.projection();

			this.$chart = d3.select('#chart svg');
			nv.addGraph(function () {
				self.chart = nv.models.stackedAreaChart()
					.x(function (d) {
						return d[0];
					})
					.y(function (d) {
						return d[1];
					})
					.clipEdge(true);

				// self.chart.showLegend(false);
				// self.chart.showControls(false);

				self.chart.xAxis
					.tickFormat(function (d) {
						return d3.time.format('%x')(new Date(d));
					});
					// .ticks(200);

				self.chart.yAxis
					.tickFormat(d3.format(',.2f'));

				self.$chart
					.datum(data)
					.transition().duration(500).call(self.chart);

				nv.utils.windowResize(self.chart.update);

				return self.chart;
			});
		},
		onShow: function () {
			this.draw();
		}
	});
	return LoanCalculator;
});