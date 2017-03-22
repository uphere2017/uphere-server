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

<<<<<<< HEAD
// WebSocket
require('./sockets')(io);
=======
db.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

db.once('open', function () {
  console.log('Connected to mongodb server')
});

// CORS Headers
var allowCORS = function (req, res, next) {
  res.header('Acess-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    return next();
  }
};

// 이 부분은 app.use(router)전에 추가
app.use(allowCORS);

/**
 * GET /users/:user_id/friend-list
 *
 * @returns [ { object } ] Each object is friend user data.
 */

app.get('/users/:user_id', function (req, res) {
  User.findOne({ name: req.params.user_id })
    .then(function (userData) {
      res.send(userData);
    })
    .catch(function (err) {
      res.sendStatus(404);
    })
});

app.get('/users/:user_id/friend-list', function (req, res) {
  var userId = req.params.user_id;
  User.findOne({ _id: userId }).exec()
    .then(function (userData) {
      var friends = userData.friend_list.split(',');
      User.find({ facebook_id: { $in: friends } }).select('-friend_list').exec(function (err, friendList) {
        if (err) {
          res.sendStatus(404);
        }
        res.json(friendList);
      });
    })
    .catch(function(err) {
      res.sendStatus(404);
    });
});

io.on('connection', function (socket) {
  clients[socket.id] = socket;

  socket.on('disconnect', function () {
    if (clients[socket.id]) {
      delete clients[socket.id];
    }
  });
});
>>>>>>> get users/user_id

// Start server
server.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Express listening on port http://%s:%s', host, port);
});

module.exports = app;
