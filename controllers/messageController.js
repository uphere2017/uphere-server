var Message = require('../models/message');
var bodyParser = require('body-parser');

var postMessageData = function (req, res) {
  var message = new Message({ text: req.body.text, sender_id: req.body.sender_id });

  message.save(function (err) {
    if(err) {
      res.sendStatus(403);
    } else {
      Message.findOne(message)
        .then(function (msg) {
          console.log('msg', msg)
          res.status(201).send(msg._id);
        })
        .catch(function (err) {
          res.sendStatus(404);
        });
    }
  });
};

module.exports = {
  postMessageData: postMessageData
};
