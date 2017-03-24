var mongoose = require('mongoose');
var Counter = require('./counters');

var Schema = mongoose.Schema;

var Relationship = new Schema({
  uphere_id: { type: Number, required: true, default: 0 },
  host_id: { type : Number, ref: 'User' },
  friends_id: [{ type : Number, ref: 'User' }]
});

Relationship.pre('save', function(next){
  var that = this;

  Counter.findOneAndUpdate({
      name: 'relationship_id'
    }, {
      $inc: { seq: 1 }
    }, {
      upsert: true,
      new: true
    }).then(function (counter) {
      that.uphere_id = counter.seq;
      next();
    }).catch(function (err) {
      console.log('Errored:', err);
    });
});

module.exports = mongoose.model('Relationship', Relationship);
