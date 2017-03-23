var mongoose = require('mongoose');
var counterMixin = require('../database').counterMixin;

var Schema = mongoose.Schema;

var User = new Schema({
  uphere_id: { type: Number, required: true },
  name: { type: String },
  profile_image_url: String,
  email_address: String,
  facebook_id: String,
  created_at: { type: Date, default: new Date() }
});

/*
 * counterMixin automagically creates an unique 'uphere_id' to each model.
 * Use model instance method 'createWithId' instead of 'save'.
 * 'createWithId' takes a callback as an argument.
 *
 * < example >
 * var user = new User();
 * user.createWithId(function (err, user) {});
*/
module.exports = counterMixin(mongoose.model('User', User), 'user_id');
