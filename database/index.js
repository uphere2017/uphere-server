var mongoose = require('mongoose');
var Counter = require('../models/counters');

mongoose.Promise = global.Promise;

module.exports = {
  connect (url) {
    mongoose.connect(url);

    var db = mongoose.connection;

    db.on('error', function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    db.once('open', function () {
      console.log('Connected to mongodb server');
    });
  }
};
