var clients = {};

module.exports = function (io) {
  io.on('connection', function (socket) {
    clients[socket.id] = socket;

    socket.on('disconnect', function () {
      if (clients[socket.id]) {
        delete clients[socket.id];
      }
    });
  });
};
