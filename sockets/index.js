var socketIO = require('socket.io');
var clients = {};

module.exports = function (server) {
  var io = socketIO(server);

  io.on('connection', function (socket) {
    console.log('Connected:', socket.id);

    clients[socket.id] = socket;

    socket.on('disconnect', function () {
      console.log('Disconnected', socket.id);

      if (clients[socket.id]) {
        delete clients[socket.id];
      }
    });

    // Example usage
    socket.on('message', function (data) {
      console.log('New message', data);
    });
  });
};
