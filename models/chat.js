var mongoose = require('mongoose');
var Counter = require('./counters');

const Schema = mongoose.Schema;

var Chat = new Schema({
  uphere_id: { type: Number, required: true, default: 0 },
  participants: [{ type: Number, ref: 'User'}],
  messages: [{ type: Number, ref: 'Message'}]
});

Chat.pre('save', function(next){
  var that = this;

  Counter.findOneAndUpdate({
      name: 'chat_id'
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

module.exports = mongoose.model('Chat', Chat);
