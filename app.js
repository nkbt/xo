"use strict";
/**
 * Initialize Gleam
 *
 * @type {gleam}
 */
var gleam = require('gleam');
gleam.setModelRoot(__dirname + '/models');

//
///**
// * Create HTTP server on port 3000
// */
//var http = require('http');
//var server = http.createServer(handleRequest);
//server.listen(3000);
//
//
///**
// * Initialize Socket.IO
// */
//var socketIo = require('socket.io');
//var io = socketIo.listen(server);
//io.sockets.on('connection', function (socket) {
//	socket.emit('ping', (new Date()).toJSON());
//	socket.on('get-ping', function () {
//		socket.emit('ping', (new Date()).toJSON());
//	})
//});


/**
 * Module dependencies.
 */

var express = require('express'),
	app = express(),
	config = {
		responseDecorator: function (response) {
			return gleam.entity('response', response);
		}
	},
	api = require('./app/api')(config),
	staticBootstrap = require('static-bootstrap');

// Config
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));

app.use(staticBootstrap(__dirname + '/public', 'bootstrap.html'));
app.use(function (error, req, res, next) {
	req.error = error;
	console.log("error", error);
	api('error', 'error')(req, res);
});


// General

app.get('/', api('index', 'index'));

// User

app.all('/rooms', api('room', 'index'));
app.get('/room/:id', api('room', 'item'));
app.get('/room/:id/add', api('room', 'add'));
app.get('/room/:id/edit', api('room', 'edit'));
app.get('/room/:id/delete', api('room', 'delete'));
app.put('/room/:id/add', api('room', 'update'));
app.put('/room/:id/edit', api('room', 'update'));
app.put('/room/:id/delete', api('room', 'update'));

app.listen(3000);
console.log('Express app started on port 3000');