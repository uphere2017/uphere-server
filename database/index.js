var mongoose = require('mongoose');
var Counter = require('../models/counters');

mongoose.Promise = global.Promise;

module.exports = {
  connect: function connect(url) {
    mongoose.connect(url);

    var db = mongoose.connection;

    db.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
    });

    db.once('open', function () {
    console.log('Connected to mongodb server');
    });
  },
  updateCounter: function updateCounter (name, callback) {
    Counter.findOneAndUpdate(
      { name: name },
      { $inc: { seq: 1 }},
      {
        upsert: true,
        new: true
      },
      function (error, counter) {
        callback(error, counter);
      });
  }
}
