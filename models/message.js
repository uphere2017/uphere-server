var mongoose = require('mongoose');
var Counter = require('./counters');

var Schema = mongoose.Schema;

var Message = new Schema({
  uphere_id: { type: Number, required: true, default: 0 },
  text: String,
  sender_id: { type: Number, ref: 'User'},
  created_at: { type: Date, default: new Date() }
});

Message.pre('save', function(next){
  var that = this;

  Counter.findOneAndUpdate({
      name: 'message_id'
    }, {
      $inc: { seq: 1 }
    }, {
      upsert: true,
      new: true
    }).then(function (counter) {
      that.uphere_id = counter.seq;
      next();
    }).catch(function (err) {
      console.log('Errored:', err);
    });
});

module.exports = mongoose.model('Message', Message);
