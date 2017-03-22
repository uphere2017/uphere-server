var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
  uphere_id: { type: Number, required: true },
  name: { type: String },
  profile_image_url: String,
  email_address: String,
  friend_list: String,
  facebook_id: String,
  created_at: {type: Date, default: new Date()}
});

module.exports = mongoose.model('User', User);
