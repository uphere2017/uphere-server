var Message = require('../models/message');
var Chat = require('../models/chat');

var postMessageData = function (req, res) {
  var message = new Message({
    text: req.body.text,
    sender_id: req.body.sender_id
  });

  message.save(function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      Chat.findOneAndUpdate({ uphere_id: req.params.chat_id }, { $push: { messages: data.uphere_id } }, { new: true })
        .then(function (chat) {
          res.status(201).send({ id: data.uphere_id, text: data.text, created_at: data.created_at, sender_id: data.sender_id });
        })
        .catch(function (err) {
          res.sendStatus(500);
        });
    }
  });
};

module.exports = {
  postMessageData: postMessageData
};
