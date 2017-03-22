var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    name: String,
    profile_image_url: String,
    email_address: String,
    facebook_id: String,
    created_at: { type: Date, default: new Date() }
});

module.exports = mongoose.model('User', User);
