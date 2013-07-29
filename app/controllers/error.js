"use strict";
module.exports = function (config) {


	var errorAction = function (req, callback) {
		return callback(req.error);
	};

	return {
		error: errorAction
	}
};