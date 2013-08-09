define(function (require) {
	'use strict';

	var _ = require('underscore');
	var momment = require('moment');

	var Accountant = {
		futureValue: function (presentValue, compoundingPeriods, periodInterestRate, payment) {

			var compounding = Math.pow(1 + periodInterestRate, compoundingPeriods);

			var growth = presentValue * compounding;
			var paydown = (payment / periodInterestRate) * (compounding - 1);

			return growth - paydown;
		},
		numberOfPayments: function (presentValue, futureValue, periodInterestRate, payment) {

			var future = (futureValue * periodInterestRate) - payment;
			var present = (presentValue * periodInterestRate) - payment;

			return Math.log(future / present) / Math.log(1 + periodInterestRate);
		},
		calculatePayment: function (presentValue, futureValue, compoundingPeriods, periodInterestRate) {

			var compounding = Math.pow(1 + periodInterestRate, compoundingPeriods);

			return ((presentValue * periodInterestRate * compounding) - (futureValue * periodInterestRate)) / (compounding - 1);
		},
		timeProjection: function (range) {
			return _.map(range, function (index) {
				var today = (new moment())
				return +today.add(moment.duration(index, 'month'));
			});
		},
		balanceProjection: function (balance, interest, payment, range) {
			var self = this;
			return _.map(range, function (index) {
				var bal = self.futureValue(balance, index, (interest / (12 * 100)), payment);
				return bal > 0 ? bal : 0;
			});
		},
		timeBalanceProjection: function (balance, interest, payment, range) {
			var time = this.timeProjection(range);
			var bal = this.balanceProjection(balance, interest, payment, range);
			return _.zip(time, bal);
		},
		necessaryPeriods: function (loans) {
			return Math.ceil(_.max(_.map(loans, function (loan) {
				var balance = loan.balance;
				var interest = loan.interest_rate;
				var payment = loan.minimum_payment;

				return Accountant.numberOfPayments(balance, 0, interest / (12 * 100), payment);
			})));
		},
		selectedPeriods: function (from, to) {
			if (!from || !to) {
				return;
			}
			var start = (from === 'now') ? new momment() : new moment(from);
			var end = new moment(to);

			return end.diff(start, 'months');
		}
	};
	return Accountant;
});