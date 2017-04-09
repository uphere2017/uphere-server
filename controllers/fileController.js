var AWS = require('aws-sdk');
var formidable = require('formidable');
var Message = require('../models/message');
var Chat = require('../models/chat');
var fs = require('fs');

AWS.config.loadFromPath('./config/credentials.json');

var s3 = new AWS.S3();
var bucketName = 'test-uphere';

var uploadFile = function (req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    var keyName = files.userfile.name;
      var params = {
        Bucket: bucketName,
        Key: keyName,
        ACL: 'public-read',
        Body: fs.createReadStream(files.userfile.path)
      };

      s3.upload(params, function (err, data) {
        if (err) {
          return res.sendStatus(500);
        }
        // Successfully uploaded data to " + bucketName + "/" + keyName);
        var message = new Message({
          text: data.Location,
          sender_id: fields.userid,
          created_at: fields.created_at
        });

        message.save(function (err, imageMessage) {
          if (err) {
            return res.sendStatus(500);
          }
          Chat.findOneAndUpdate({ uphere_id: req.params.chat_id }, { $push: { messages: imageMessage.uphere_id } }, { new: true })
          .then((result) => {
            res.status(201).send(imageMessage);
          }).catch((err) => {
            res.status(500).send(err);
          })
        })
    });

      if(err) {
        return res.sendStatus(500);
      }
  });
}

module.exports = {
  uploadFile: uploadFile
};
