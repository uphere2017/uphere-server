var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var Chat = new Schema({
    participants: [String],
    messages: [String]
});

module.exports = mongoose.model('Chat', Chat);
