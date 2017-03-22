var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var Chat = new Schema({
  uphere_id: { type: Number, required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}]
});

module.exports = mongoose.model('Chat', Chat);
