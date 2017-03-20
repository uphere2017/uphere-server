var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Message = new Schema({
    text: String,
    sender_id: String
});

module.exports = mongoose.model('Message', Message);
