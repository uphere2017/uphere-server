var userController = require('../controllers/userController');
var messageController = require('../controllers/messageController');
var chatController = require('../controllers/chatController');
var verifyToken = require('../middlewares/jwt');

module.exports = function (app) {
  app.get('/secret', function (req, res) {
    res.send('Hello, server is live!');
  });

  app.post('/login', userController.loginUser);
  app.get('/users/:user_id', verifyToken, userController.getUserData);
  app.get('/users/:user_id/chats', verifyToken, chatController.getUserChatList);
  app.get('/users/:user_id/friend-list', verifyToken, userController.getFriendList);

  app.post('/chats', verifyToken, chatController.createChat);
  app.post('/chats/:chat_id', verifyToken, messageController.postMessageData);

  app.delete('/chats/:chat_id', chatController.deleteChat);
};
