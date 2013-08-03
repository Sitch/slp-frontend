/*global define*/
define(function () {
	"use strict";

	return {
		ACCOUNT: {
			authorized: 'Your account has been authorized.',
			invalid: "Failed to connect this service. Please try again.",
			removed: 'Account has been removed.',
			pending: 'We\'re processing your request. It won\'t take long.'
		},
		ERRORS: {
			general: 'Oops! Something bad happened.',
			connectGoogle: 'Email address is required.',
			connectExchange: 'Email and password are required.',
			connectIMAP: 'All fields are required.',
			invalidemail: 'Email address is invalid.'
		},
		TASK: {
			errors: {
				name: "Name is required.",
				start: "Start time is required.",
				end: "End time is required.",
				general: "Name and date are required."
			}
		},
		BROWSE: {
			noresults: {
				filters: {
					header: "Nothing here",
					text: "Try removing filters, using a different keyword."
				},
				category: {
					header: "Nothing here",
					text: "<a class=\"get-started fancy-link\">Get Started</a> by connecting more accounts."
				},
				processing: {
					header: "Seer found no matches",
					text: "Try removing filters or give Seer a few more minutes to refresh all your accounts and try again."
				}
			}
		},
		SHARING: {
			success: 'Your file has been successfully shared.',
			failure: 'Oops! There\'s been an error. Please try again.',
			selectacontact: 'Use the form to specifiy email addresses or find contacts.'
		}
	};

});