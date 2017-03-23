const WebSocket = require('ws');

module.exports = function (server) {
  const wss = new WebSocket.Server({ server: server });

  wss.on('connection', (ws) => {
    console.log('WebSocket Connection has been established.');

    ws.on('message', (message) => {
      ws.send(message);
    });

    ws.send('Why hello there!');
  });
};
