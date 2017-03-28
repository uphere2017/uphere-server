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
      Chat.findOneAndUpdate({ uphere_id: req.params.chat_id }, { $push: { messages: data.uphere_id } })
        .then(function (msg) {
          res.status(201).send({ id: data.uphere_id });
        })
        .catch(function (err) {
          res.sendstatus(500);
        });
    }
  });
};

module.exports = {
  postMessageData: postMessageData
};
