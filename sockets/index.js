var socketIO = require('socket.io');
var EVENTS = require('./events');
var clients = {};

var findSocketByUphereID = function (id) {
  var friendSocketData;

  for (var socketID in clients) {
    if (clients[socketID].user_uphere_id === id) {
      friendSocketData = clients[socketID];
    }
  }

  return friendSocketData ? friendSocketData.socket : null;
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
            friend_id: data.user_uphere_id,
            return_id: data.mySocketId
          });
        }
      });
    });

    socket.on('RETURN_SIGNAL', function({ return_id, myUphereId }) {
      if (io.sockets.connected[return_id]) {
        io.sockets.connected[return_id].emit('RETURN_SIGNAL', { myUphereId });
      }
    });

    socket.on(EVENTS.SEND_NEW_MESSAGE, function (data) {
      var targetSocket = findSocketByUphereID(data.receipient_id);

      if (targetSocket) {
        targetSocket.emit(EVENTS.RECEIVE_NEW_MESSAGE, {
          message: {
            text: data.text,
            sender_id: data.sender_id,
            created_at: data.created_at,
            uphere_id: data.text_id
          },
          chat_id: data.chat_id,
          chat: data.chat
        });
      }

      console.log('[API-LOG] New Message: ', {
        sender_id: data.sender_id,
        text: data.text
      });

      console.log('[API-LOG] Friend UPHERE_ID List:', data.friend_list);

      data.friend_list.forEach(function (friendID, i) {
        console.log('[API-LOG] Friend UPHERE_ID:', friendID);
        var friendSocket = findSocketByUphereID(friendID);

        if (friendSocket) {
          console.log('[API-LOG] Found Friend\'s Socket');
          console.log('[API-LOG] Emitting FRIEND_EMOTION_CHANGE with data:', {
            emotion_status: data.emotion_status,
            friend_id: data.sender_id
          });

          friendSocket.emit(EVENTS.FRIEND_EMOTION_CHANGE, {
            emotion_status: data.emotion_status,
            friend_id: data.sender_id
          });
        } else {
          console.log('[API-LOG] Found Friend\'s Socket:', friendID);
        }
      });
    });
  });
};
