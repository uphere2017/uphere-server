var Message = require('../models/message');
var Chat = require('../models/chat');
var User = require('../models/user');
var Q = require('q');

var postMessageData = function (req, res) {
  var chatId = req.params.chat_id;

  if (isNaN(Number(chatId))) {
    return res.status(404).json({
      error: 'Invalid Parameter'
    });
  }

  var message = new Message({
    text: req.body.text,
    sender_id: req.body.sender_id
  });

  message.save(function (err, data) {
    if (err) {
      res.sendStatus(500);
    }

    var promiseArr = [];

    promiseArr.push(Chat.findOneAndUpdate({ uphere_id: req.params.chat_id }, { $push: { messages: data.uphere_id } }, { new: true }));
    promiseArr.push(User.findOneAndUpdate({ uphere_id: data.sender_id }, { $set: {emotion_status: req.body.emotion_status } }, {new: true }));

    Q.all(promiseArr)
      .done(function (values) {
        res.status(201).send({ id: data.uphere_id, text: data.text, created_at: data.created_at, sender_id: data.sender_id, emotion_status: values[1].emotion_status });
      })
  });
};

module.exports = {
  postMessageData: postMessageData
};
