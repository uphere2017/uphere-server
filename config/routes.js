var userController = require('../controllers/userController');
var messageController = require('../controllers/messageController');
var chatController = require('../controllers/chatController');

module.exports = function (app) {
  /**
   * GET /users/:user_id/friend-list
   *
   * @returns [ { object } ] Each object is friend user data.
   */
  app.get('/users/:user_id/friend-list', userController.getFriendList);

  app.get('/secret', function (req, res) {
    res.send('Hello, server is live!');
  });

  app.post('/users', userController.createUser);
  app.get('/users/:user_id', userController.getUserData);
  app.get('/users/:user_id/chats', chatController.getUserChatList);

  app.post('/chats', chatController.createChat);
  app.post('/chats/:chat_id', messageController.postMessageData);
};
