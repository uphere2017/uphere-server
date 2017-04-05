var mongoose = require('mongoose');
var Counter = require('./counters');

var Schema = mongoose.Schema;

var User = new Schema({
  uphere_id: { type: Number, required: true, default: 0 },
  name: { type: String },
  profile_image_url: String,
  email_address: String,
  facebook_id: String,
  created_at: { type: Date, default: new Date() },
  isOnOff: false,
  emotion_status: { type: Number, default: 0 }
});

User.pre('save', function(next){
  var that = this;

  Counter.findOneAndUpdate({
      name: 'user_id'
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

module.exports = mongoose.model('User', User);
