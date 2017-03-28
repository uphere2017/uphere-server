var Chat = require('../models/chat');
var User = require('../models/user');
var Message = require('../models/message');

var createChat = function (req, res) {
  Chat.find({ participants: req.body.participants }, function (err, Chats) {
    if (err) {
      res.sendStatus(404);
    }
    if (Chats.length === 0) {
      var chat = new Chat();
      chat.participants = req.body.participants;
      chat.messages = req.body.messages;
      chat.save()
        .then(data => {
          res.status(201).send({ chat_id: data.uphere_id })
        })
        .catch(err => {
          res.status(500).send(err);
        })
    } else {
      res.sendStatus(208);
    }
  });
};

var getUserChatList = function (req, res) {
  var userId = req.params.user_id;

  Chat.find({ participants: { $all: [userId] }})
    .exec((err, chats) => {
      if (err) {
        return res.status(500).send(err);
      }

      var numOfChats = chats.length;
      var finalResponse = {
        chats: []
      };

      if (numOfChats) {
        for (var i = 0; i < numOfChats; i++) {
          var chat = chats[i];

          var resChat = {
            uphere_id: chat.uphere_id,
            participants: chat.participants,
            messages: []
          };

          var numOfMessages = chat.messages.length;

          finalResponse.chats.push(resChat);

          if (numOfMessages) {
            for (var j = 0; j < numOfMessages; j++) {
              var message = chat.messages[j];

              Message.find({ uphere_id: message })
                .exec((err, message) => {
                  if (err) {
                    res.status(500).send(err);
                    j = chat.messages.length;
                  } else {
                    resChat.messages.push({
                      sender_id: message[0].sender_id,
                      uphere_id: message[0].uphere_id,
                      text: message[0].text,
                      created_at: message[0].created_at
                    });

                    if (numOfMessages === resChat.messages.length && finalResponse.chats.length === numOfChats) {
                      j = chat.messages.length;
                      i = chats.length;
                      res.json(finalResponse);
                    }
                  }
                });
            }
          } else {
            res.json(finalResponse);
            i = chats.length;
          }
        }
      } else {
        res.json(finalResponse);
      }
    });
};

module.exports = {
  getUserChatList: getUserChatList,
  createChat: createChat
};
