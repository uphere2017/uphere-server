var express = require('express');
var app = express();
var User = require('./models/user');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var clients = {};

mongoose.Promise = global.Promise;

/**
 * GET /users/:user_id/friend-list
 *
 * @returns [ { object } ] Each object is friend user data.
 */
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

// DB Connection
require('./database');

// Middlewares
require('./middlewares')(app);

// WebSocket
require('./sockets')(io);

// Start server
server.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Express listening on port http://%s:%s', host, port);
});

module.exports = app;
