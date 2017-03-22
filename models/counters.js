var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var CounterSchema = new Schema({
  seq: { type: Number, default: 0 },
  name: { type: String }
});


module.exports = mongoose.model('Counter', CounterSchema);
