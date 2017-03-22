var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Relationship = new Schema({
  uphere_id: { type: Number, required: true },
  host_id: { type : Schema.Types.ObjectId, ref: 'User' },
  friends_id: [{ type : Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Relationship', Relationship);
