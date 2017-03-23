var mongoose = require('mongoose');
var Counter = require('../models/counters');

mongoose.Promise = global.Promise;

mongoUtilities = {
  connect: function connect (url) {
    mongoose.connect(url);

    var db = mongoose.connection;

    db.on('error', function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    db.once('open', function () {
      console.log('Connected to mongodb server');
    });
  },
  counterMixin: function (model, name) {
    model.prototype.createWithId = function (callback) {
      var that = this;

      if (!callback) {
        throw Error('[CounterMixin] Callback is an required argument to create a model.');
      }

      mongoUtilities.updateCounter(name).then(function (counter) {
        that.uphere_id = counter.seq;
        that.save(callback);
      });
    };

    return model;
  },
  updateCounter: function updateCounter (name) {
    return Counter.findOneAndUpdate({
      name: name
    }, {
      $inc: { seq: 1 }
    }, {
      upsert: true,
      new: true
    });
  }
};

module.exports = mongoUtilities;
