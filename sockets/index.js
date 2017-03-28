var socketIO = require('socket.io');
var EVENTS = require('./events');
var clients = {};

var findSocketByUphereID = function (id) {
  var friendSocketData = null;

  for (var socketID in clients) {
    if (clients[socketID].user_uphere_id === id) {
      friendSocketData = clients[socketID];
    }
  }

  return friendSocketData.socket;
};

module.exports = function (server) {
  var io = socketIO(server);

  io.on('connection', function (socket) {
    console.log('Connected:', socket.id);

    clients[socket.id] = {
      socket: socket,
      user_uphere_id: null
    };

    socket.on('disconnect', function () {
      console.log('Disconnected', socket.id);

      if (clients[socket.id]) {
        delete clients[socket.id];
      }
    });

    socket.on(EVENTS.LOG_IN, function (data) {
      clients[socket.id].user_uphere_id = data.user_uphere_id;
    });

    socket.on(EVENTS.USER_ONLINE, function (data) {
      data.friend_list.forEach(function (friendID) {
        var friendSocket = findSocketByUphereID(friendID);

        if (friendSocket) {
          friendSocket.emit(EVENTS.FRIEND_ONLINE, {
            friend_id: data.user_uphere_id
          });
        }
      });
    });
  });
};
