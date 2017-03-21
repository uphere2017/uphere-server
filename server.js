var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var clients = {};

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://master:djqgldj1234@ds137100.mlab.com:37100/upheredb/');

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err)
});
db.once('open', function () {
  console.log('Connected to mongodb server')
});

app.get('/', function (req, res) {
  res.send('Hello Uphere');
});

io.on('connection', function(socket) {
  console.log('A user connected');
  clients[socket.id] = socket;

  socket.on('disconnect', function() {
    if (clients[socket.id]) {
      console.log('User disconnected');
      delete clients[socket.id];
    }
  });
});

server.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Express listening on port http://%s:%s', host, port);
});

module.exports = app;
