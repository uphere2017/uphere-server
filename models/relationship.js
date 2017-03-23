var mongoose = require('mongoose');
var counterMixin = require('../database').counterMixin;

var Schema = mongoose.Schema;

var Relationship = new Schema({
  uphere_id: { type: Number, required: true },
  host_id: { type : Number, ref: 'User' },
  friends_id: [{ type : Number, ref: 'User' }]
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
module.exports = counterMixin(mongoose.model('Relationship', Relationship), 'relationship_id');
