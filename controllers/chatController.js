var Chat = require('../models/chat');
var User = require('../models/user');
var Message = require('../models/message');
var Q = require('q');

var createChat = function (req, res) {
  if (!Array.isArray(req.body.participants) || !Array.isArray(req.body.messages)) {
    return res.status(404).json({
      error: 'Invalid Data'
    });
  }

  var participants = req.body.participants.slice();
  var reversedParticipants = req.body.participants.reverse();

  Chat.find({ "$or": [
    { participants: participants },
    { participants: reversedParticipants }
  ]}, function (err, chats) {
    if (err) {
      res.sendStatus(404);
    }

    if (chats.length === 0) {
      var chat = new Chat();
      chat.participants = req.body.participants;
      chat.messages = req.body.messages;
      chat.save()
        .then(data => {
          User.find({
            uphere_id: { $in: chat.participants }
          }, function (err, docs) {
            data.participants = docs;
            res.status(201).send({ chat: data })
          });
        })
        .catch(err => {
          res.status(500).send(err);
        })
    } else {
      var chat = chats[0];
      User.find({
        uphere_id: { $in: chat.participants }
      }, function (err, docs) {
        chat.participants = docs;

        Message.find({
          uphere_id: { $in: chat.messages }
        }, function (err, docs) {
          chat.messages = docs;

          res.status(208).send({ chat: chat });
        });
      });
    }
  });
};

var getUserChatList = function (req, res) {
  var userId = req.params.user_id;

  if (isNaN(Number(userId))) {
    return res.status(404).json({
      error: 'Invalid Parameter'
    });
  }

  Chat.find({ participants: { $all: [userId] }})
    .exec((err, chats) => {
      if (err) {
        return res.status(500).send(err);
      }

      var promiseArr = [];

      chats.forEach(function (chat) {
        chat.messages.forEach(function (message) {
          promiseArr.push(Message.find({ uphere_id: message }));
        });
      });

      Q.all(promiseArr)
       .done(function (values) {
         values.forEach(function (arr) {
           var message = arr[0]._doc;

           chats.forEach(function (chat) {
             chat.messages.forEach(function (id, i) {
               if (id === message.uphere_id) {
                 chat.messages[i] = message;
               }
             });
           });
         });

         res.status(200).send({ chats: chats });
       });
    });
};

module.exports = {
  getUserChatList: getUserChatList,
  createChat: createChat
};
