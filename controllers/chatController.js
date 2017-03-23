var Chat = require('../models/chat');

var createChatRoom = function (req, res) {
  Chat.find({ participants: req.body.participants }, function (err, Chats) {
    if (err) {
      res.sendStatus(404);
    }

    if (Chats.length === 0) {
      var chat = new Chat();
      chat.participants = req.body.participants;
      chat.messages = [];
      chat.createWithId(function (err, chat) {
        if (err) {
          res.sendStatus(500);
        }
        res.sendStatus(201).send({ chat_id: chat.uphere_id })
      });
    }
    res.sendStatus(208);
  });
};

module.exports = {
  createChatRoom: createChatRoom
};
