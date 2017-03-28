var socketIO = require('socket.io');
var clients = {};

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

    socket.on('LOG_IN', function (data) {
      clients[socket.id].user_uphere_id = data.user_uphere_id;
    });

    socket.on('USER_ONLINE', function (data) {
      data.friend_list.forEach(function (friendID) {
        for (var socketID in clients) {
          var friendSocket = clients[socketID];
          if (friendSocket.user_uphere_id === friendID) {
            friendSocket.socket.emit('FRIEND_ONLINE', {
              friend_id: data.user_uphere_id
            });
          }
        }
      });
    });
  });
};
