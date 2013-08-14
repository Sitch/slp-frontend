define(['handlebars'], function (Handlebars) {
	'use strict';

	var buildMap = {};
 
	return {
		load: function (name, parentRequire, onload, config) {
			if (config.isBuild) {
				var fsPath = config.dirBaseUrl + 'Templates/' + name + '.handlebars'; // TODO - add ext into config options
				buildMap[name] = nodeRequire('fs').readFileSync(fsPath).toString();
				onload();
			} else {
				var JST = window.JST || {};
				var path = 'src/Templates/' + name + '.handlebars'; // TODO: add path into config options

				if (JST[path]) {
					// Grunt.js pre-compiles templates into JST[]
					onload(JST[path]);
				} else {
					// use text.js plugin when loading templates during development
					parentRequire(['text!templates/' + name + '.handlebars'], function (raw) {
						onload(Handlebars.compile(raw));
					});
				}
			}
		}
	};
});


