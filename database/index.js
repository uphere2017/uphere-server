var mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect('mongodb://master:djqgldj1234@ds137100.mlab.com:37100/upheredb/');

  var db = mongoose.connection;

  db.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
  });

  db.once('open', function () {
    console.log('Connected to mongodb server');
  });
};
