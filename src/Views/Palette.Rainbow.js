define(function (require) {
	'use strict';

	var _ = require('underscore');

	var colors = {
		'turquoise': '#1abc9c',
		'green-sea': '#16a085',
		'emerald': '#2ecc71',
		'nephritis': '#27ae60',
		'peter-river': '#3498db',
		'belize-hole': '#2980b9',
		'amethyst': '#9b59b6',
		'wisteria': '#8e44ad',
		'wet-asphalt': '#34495e',
		'midnight-blue': '#2c3e50',
		'sun-flower': '#f1c40f',
		'orange': '#f39c12',
		'carrot': '#e67e22',
		'pumpkin': '#d35400',
		'alizarin': '#e74c3c',
		'pomegranate': '#c0392b',
		'clouds': '#ecf0f1',
		'silver': '#bdc3c7',
		'concrete': '#95a5a6',
		'asbestos': '#7f8c8d'
	};
	var colorValues = _.values(colors);

	var Rainbow = function () {
		this.index = 0;
		this.colors = _.clone(colorValues);
	};
	Rainbow.prototype = {
		get: function () {
			return this.colors[this.index++];
		},
		shuffle: function () {
			this.colors = _.shuffle(this.colors);
		},
		reset: function () {
			this.index = 0;
		}
	};
	return Rainbow;
});