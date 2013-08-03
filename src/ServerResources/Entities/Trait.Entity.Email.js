define(function (require) {
	'use strict';

	return {

		reply: function () {
			var message = this.get('message');
			var body = (this.get('textIsHTML') ? '' : '&body=%0A%0A' + message.text.replace(/[\r|\n]/g, '%0D%20%3E'));
			return [
				'mailto:',
				message.from,
				'?subject=Re: ', encodeURIComponent(message.subject),
				body].join('');
		},

		parse: function (response) {

			response.isHTML = response.message.html !== ""

			if (response.isHTML) {
				response.embedLink = stringutil.embedLink(response.message.html);
			}

			if (/<html|xhtml>/i.test(response.message.text)) {
				response.isHTML = true;
				response.textIsHTML = true;
				response.embedLink = stringutil.embedLink(response.message.text);
			}

			if (response.attachments.length) {
				attachmentCollection.sync("create", attachmentCollection, {
					data: JSON.stringify(response.attachments),
					success: function (models) {
						attachmentCollection.set(models);
					}
				});
			}

			return response;
		}

	};

});