"use strict";
/**
 * Initialize Gleam
 * 
 * @type {gleam}
 */
var gleam = require('gleam');
gleam.setModelRoot(__dirname + '/models');


/**
 * Initialize Puma
 * 
 * @type {puma}
 */
var puma = require('puma');
puma.setModuleRoot(__dirname + '/modules');
puma.setResponseDecorators({
	response: function (response) {
		return gleam.entity('response', response);
	},
	payload: function (payload) {
		return gleam.entity('payload', payload);
	},
	message: function (message) {
		return gleam.entity('message', message);
	}
});


/**
 * Emulate some Express.js methods
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} callback
 */
var wrapReqRes = function (req, res, callback) {
	res.status = function (code) {
		this.statusCode = code;
		return this;
	}.bind(res);
	res.send = function () {
		return this.end.apply(this, Array.prototype.slice.call(arguments));
	}.bind(res);
	res.set = function () {
		return this.setHeader.apply(this, Array.prototype.slice.call(arguments));
	}.bind(res);
	callback(null, req, res);
};

/**
 * @param {Object} req
 * @param {Object} res
 */
var async = require('async');
var handleRequest = function (req, res) {
	return async.waterfall([
		async.apply(wrapReqRes, req, res),
		puma.bootstrapMiddleware(__dirname + '/public', 'index.html'),
		async.apply(puma.routeDefault, req, res),
		function (error) {
			console.log("error", arguments);
			return puma.errorHandlerMiddleware(error, req, res)
		}
	]);
};


/**
 * Create HTTP server on port 3000
 */
var http = require('http');
var server = http.createServer(handleRequest);
server.listen(3000);


/**
 * Initialize Socket.IO
 */
var socketIo = require('socket.io');
var io = socketIo.listen(server);
io.sockets.on('connection', function (socket) {
	socket.emit('ping', (new Date()).toJSON());
	socket.on('get-ping', function () {
		socket.emit('ping', (new Date()).toJSON());
	})
});


