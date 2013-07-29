"use strict";

var path = require('path');

module.exports = function (config) {

	var responseDecorator = config.responseDecorator || function (response) {
		return response;
	};

	return function (controllerName, actionName) {
		var controller = require(path.join(__dirname, 'controllers', controllerName));
		var action = controller(config)[actionName];

		return function (req, res) {
			action(req, function(error, response) {
				if (error) {
					res.status(500);
					console.log("error", error);
					response = {message: [error.message]};
				}
				var data = responseDecorator(response || {});
				console.log("data", data);
				return res.json(data);
			})
		};
	}
};