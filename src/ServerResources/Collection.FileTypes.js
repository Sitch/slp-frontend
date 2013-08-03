define(function (require) {
	'use strict';

	var _ = require('underscore');
	var Backbone = require('backbone');
	var AccountModel = require('./Model.Account');

	var fileTypes = [{
			type: 'default',
			display: 'All file types',
			filetypes: '',
			show: 'false'
		}, {
			type: 'document',
			display: 'Documents',
			filetypes: 'doc,docx,dot,dotx,gdoc,mcw,odm,odt,ott,omm,pages,sdw,stw,sxw,wpd,wps,wpt,wri'
		}, {
			type: 'presentation',
			display: 'Presentations',
			filetypes: 'gslides,key,nb,nbp,odp,otp,pez,pot,pps,ppt,pptx,prz,sdd,shf,show,shw,slp,sspss,sti,sxi,watch'
		}, {
			type: 'spreadsheet',
			display: 'Spreadsheets',
			filetypes: 'csv,gsheet,numbers,gnumeric,ods,ots,xlk,xls,xlsb,xlsm,xlsx,xlr,xlt,xltm,xlw'
		}, {
			type: 'pdf',
			display: 'PDFs',
			filetypes: 'pdf'
		}, {
			type: 'image',
			display: 'Images',
			filetypes: 'png,jpg,jpeg,gif,svg'
		}, {
			type: 'video',
			display: 'Videos',
			filetypes: 'mp4,webm,ogv,mov,m4v,mpeg,mpg,mpe,ogg,wmv,avi'
		}, {
			type: 'audio',
			display: 'Music',
			filetypes: 'm4a,m4p,mp3,raw,wav,wma'
		}
	];

	var FileTypesCollection = Backbone.Collection.extend({
		getByType: function (type) {
			return this.where({
				type: type || 'default'
			}).shift();
		}
	});

	return new FileTypesCollection(fileTypes);
});