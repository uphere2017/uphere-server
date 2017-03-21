var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var clients = {};

var env = process.env.NODE_ENV || 'development';

// credentials
var db = require('./config/database')(env);
require('./database')(db.url);

// Middlewares
require('./middlewares')(app);

// Routes
require('./config/routes')(app);

// WebSocket
require('./sockets')(io);

// Start server
server.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Express listening on port http://%s:%s', host, port);
});

exports.app = app;
exports.db = db;
