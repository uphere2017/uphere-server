var AWS = require('aws-sdk');
var formidable = require('formidable');
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

      if (err) {
        res.sendStatus(404);
      }

      s3.upload(params, function (err, data) {
        if (err) {
          res.sendStatus(500);
        }
        
        var message = new Message({
          text: data.Location,
          sender_id: fields.userid
        });

        message.save(function (err, imageMessage) {
          if (err) {
            res.sendStatus(500);
          }
          res.status(201).send(imageMessage);  
        });
        
      });
  });
};

module.exports = {
  uploadFile: uploadFile
};
