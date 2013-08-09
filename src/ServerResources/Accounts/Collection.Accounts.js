define(function (require) {
	'use strict';

	var _ = require('underscore');
	var moment = require('moment');
	var CacheableCollection = require('Shared/Cache/Collection.Cacheable');
	var AccountModel = require('./Model.Account');

	var Accountant = require('./Trait.Accountant');

	var AccountCollection = CacheableCollection.extend({
		model: AccountModel,
		url: function () {
			// return ['/api', App.userId, 'accounts'].join('/');
			// return '../api/accounts';
			return '../api/form/schema';
		},
		initialize: function () {
			this.register('accounts');
		},
		parse: function (data) {
			return [{
				"account_id": 29878,
				"nslds_servicer_id": 2,
				"is_linked": 0,
				"is_saved": 1,
				"is_error": 0,
				"start_refresh": 1,
				"yodlee_item_id": 0,
				"name": "Sallie Mae (Department of Education Loan Services)",
				"last_refresh_time": 0,
				"servicer_id": 1089,
				"site_display_name": "Sallie Mae (Department of Education Loan Services)",
				"logo_image": null,
				"phone_number": "888-272-5543",
				"website": "https://www.salliemae.com/",
				"balance": 23323,
				"minimum_payment": 0,
				"due_date": 0,
				"loan_count": 10,
				"refresh_status": "SUCCESS",
				"loans": [{
					"name": "Cornell University",
					"loan_id": 73579,
					"account_id": 29878,
					"loan_type_id": 2,
					"loan_type_name": "Stafford Subsidized",
					"payment_plan_id": 0,
					"interest_rate": 6.2,
					"balance": 2712,
					"minimum_payment": 57.15,
					"account_name": "DEPT OF ED/SALLIE MAE"
				}, {
					"name": "Cornell University",
					"loan_id": 73578,
					"account_id": 29878,
					"loan_type_id": 2,
					"loan_type_name": "Stafford Subsidized",
					"payment_plan_id": 0,
					"interest_rate": 6.2,
					"balance": 4355,
					"minimum_payment": 66.23,
					"account_name": "DEPT OF ED/SALLIE MAE"
				}, {
					"name": "Cornell University",
					"loan_id": 73577,
					"account_id": 29878,
					"loan_type_id": 2,
					"loan_type_name": "Stafford Subsidized",
					"payment_plan_id": 0,
					"interest_rate": 6.2,
					"balance": 2177,
					"minimum_payment": 23.15,
					"account_name": "DEPT OF ED/SALLIE MAE"
				}, {
					"name": "Cornell University",
					"loan_id": 73576,
					"account_id": 29878,
					"loan_type_id": 2,
					"loan_type_name": "Stafford Subsidized",
					"payment_plan_id": 0,
					"interest_rate": 6.2,
					"balance": 3155,
					"minimum_payment": 33.10,
					"account_name": "DEPT OF ED/SALLIE MAE"
				}, {
					"name": "Cornell University",
					"loan_id": 73575,
					"account_id": 29878,
					"loan_type_id": 2,
					"loan_type_name": "Stafford Subsidized",
					"payment_plan_id": 0,
					"interest_rate": 6.2,
					"balance": 1183,
					"minimum_payment": 27.18,
					"account_name": "DEPT OF ED/SALLIE MAE"
				}, {
					"name": "Cornell University",
					"loan_id": 73574,
					"account_id": 29878,
					"loan_type_id": 2,
					"loan_type_name": "Stafford Subsidized",
					"payment_plan_id": 0,
					"interest_rate": 6.2,
					"balance": 2362,
					"minimum_payment": 23.23,
					"account_name": "DEPT OF ED/SALLIE MAE"
				}, {
					"name": "Cornell University",
					"loan_id": 73573,
					"account_id": 29878,
					"loan_type_id": 2,
					"loan_type_name": "Stafford Subsidized",
					"payment_plan_id": 0,
					"interest_rate": 6.2,
					"balance": 1968,
					"minimum_payment": 44.11,
					"account_name": "DEPT OF ED/SALLIE MAE"
				}, {
					"name": "Cornell University",
					"loan_id": 73572,
					"account_id": 29878,
					"loan_type_id": 5,
					"loan_type_name": "Stafford Unsubsidized",
					"payment_plan_id": 0,
					"interest_rate": 6.2,
					"balance": 3380,
					"minimum_payment": 33.10,
					"account_name": "DEPT OF ED/SALLIE MAE"
				}, {
					"name": "Cornell University",
					"loan_id": 73571,
					"account_id": 29878,
					"loan_type_id": 5,
					"loan_type_name": "Stafford Unsubsidized",
					"payment_plan_id": 0,
					"interest_rate": 6.2,
					"balance": 1336,
					"minimum_payment": 13.87,
					"account_name": "DEPT OF ED/SALLIE MAE"
				}, {
					"name": "School Code For Consolidation Loans",
					"loan_id": 73570,
					"account_id": 29878,
					"loan_type_id": 23,
					"loan_type_name": "Consolidation Subsidized",
					"payment_plan_id": 0,
					"interest_rate": 6.2,
					"balance": 695,
					"minimum_payment": 8.88,
					"account_name": "DEPT OF ED/SALLIE MAE"
				}],
				"created_at": 1375833455,
				"is_deleted": 0
			}, {
				"account_id": 29879,
				"nslds_servicer_id": 49,
				"is_linked": 0,
				"is_saved": 1,
				"is_error": 0,
				"start_refresh": 1,
				"yodlee_item_id": 0,
				"name": "CARNEGIE-MELLON UNIVERSITY",
				"last_refresh_time": 0,
				"servicer_id": 0,
				"site_display_name": null,
				"logo_image": null,
				"phone_number": "Unknown",
				"website": "Unknown",
				"balance": 11917,
				"minimum_payment": 0,
				"due_date": 0,
				"loan_count": 3,
				"refresh_status": "SUCCESS",
				"loans": [{
					"name": "Carnegie-mellon University",
					"loan_id": 73582,
					"account_id": 29879,
					"loan_type_id": 19,
					"loan_type_name": "Perkins",
					"payment_plan_id": 0,
					"interest_rate": 6.4,
					"balance": 2939,
					"minimum_payment": 25.25,
					"account_name": "CARNEGIE-MELLON UNIVERSITY"
				}, {
					"name": "Cornell University",
					"loan_id": 73581,
					"account_id": 29879,
					"loan_type_id": 19,
					"loan_type_name": "Perkins",
					"payment_plan_id": 0,
					"interest_rate": 5.2,
					"balance": 7879,
					"minimum_payment": 95.27,
					"account_name": "CARNEGIE-MELLON UNIVERSITY"
				}, {
					"name": "Cornell University",
					"loan_id": 73580,
					"account_id": 29879,
					"loan_type_id": 19,
					"loan_type_name": "Perkins",
					"payment_plan_id": 0,
					"interest_rate": 2.1,
					"balance": 1099,
					"minimum_payment": 13.23,
					"account_name": "CARNEGIE-MELLON UNIVERSITY"
				}],
				"created_at": 1375833455,
				"is_deleted": 0
			}];
		},
		getAllLoans: function () {
			return _.reduce(this.models, function (result, model) {
				return result.concat(model.get('loans'));
			}, []);
		},
		chooseRange: function (loans, until) {
			// Choose best range
			var defaultPeriods = 12 * 20;
			var necessaryPeriods = Accountant.necessaryPeriods(loans);
			var selectedPeriods = until; //Accountant.selectedPeriods('now', until);

			return _.range(0, selectedPeriods || necessaryPeriods || defaultPeriods);
		},
		projectAggregate: function (until) {

			var loans = this.getAllLoans();
			var range = this.chooseRange(loans, until);

			// Map d3 format
			var timeProjection = Accountant.timeProjection(range);
			var balanceProjection = _.map(loans, function (loan) {
				var name = loan.name;
				var balance = loan.balance;
				var interest = loan.interest_rate;
				var payment = loan.minimum_payment;

				return Accountant.balanceProjection(balance, interest, payment, range);
			});

			// Transpose from column to row
			var transpose = _.zip.apply(_, balanceProjection);

			var aggregate = _.map(transpose, function (item) {
				return _.reduce(item, function (a, b) {
					return a + b;
				}, 0);
			});

			return [{
				key: 'ALL',
				values: _.zip(timeProjection, aggregate)
			}];
		},
		projection: function (until) {

			var loans = this.getAllLoans();
			var range = this.chooseRange(loans, until);

			// Map d3 format
			return _.map(loans, function (loan) {
				var name = loan.name;
				var balance = loan.balance;
				var interest = loan.interest_rate;
				var payment = loan.minimum_payment;

				return {
					key: name,
					// color: '#333333',
					values: Accountant.timeBalanceProjection(balance, interest, payment, range)
				};
			});
		},
		calculateTotalBalance: function () {
			return _.reduce(this.getAllLoans(), function (sum, loan) {
				return sum + loan.balance;
			}, 0);
		}
	});
	return AccountCollection;
});