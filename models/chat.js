var mongoose = require('mongoose');
var counterMixin = require('../database').counterMixin;

const Schema = mongoose.Schema;

var Chat = new Schema({
  uphere_id: { type: Number, required: true },
  participants: [{ type: Number, ref: 'User'}],
  messages: [{ type: Number, ref: 'Message'}]
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
module.exports = counterMixin(mongoose.model('Chat', Chat), 'chat_id');
