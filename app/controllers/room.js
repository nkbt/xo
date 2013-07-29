"use strict";
module.exports = function (config) {

	var indexAction = function (req, next) {
		return next(null, {});
	};


	var itemAction = function (req, next) {
		return next(null, {});
	};


	var addAction = function (req, next) {
		return next(null, {});
	};


	var editAction = function (req, next) {
		return next(null, {});
	};


	var removeAction = function (req, next) {
		return next(null, {});
	};


	var updateAction = function (req, next) {
		return next(null, {});
	};


	return {
		index: indexAction,
		item: itemAction,
		add: addAction,
		edit: editAction,
		remove: removeAction,
		update: updateAction
	}
};