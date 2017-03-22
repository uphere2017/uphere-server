var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Message = new Schema({
  uphere_id: { type: Number, required: true },
  text: String,
  sender_id: { type: Schema.Types.ObjectId, ref: 'User'},
  created_at: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Message', Message);
