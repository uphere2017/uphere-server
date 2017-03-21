var app = require('../server').app;
var request = require('supertest');
var expect = require('chai').expect;
var db = require('../server').db;
var User = require('../models/user');
var mockData = require('./mockData');

describe('Test Mocha', function () {
  it('Should answer GET requests for / with a 200 status code', function (done) {
    request(app)
      .get('/')
      .expect(404, done);
  });
});

describe('Test find friend list', function () {

  beforeEach(function(done) {
    var person = new User(mockData[0]);
    person.save(function() {
      done();
    });
  });

  it ('Should have JinHo', function (done) {
    User.findOne({ name: 'JinHo' })
      .exec(function (err, person) {
        expect(person.name).to.equal('JinHo');
        done();
    });
  });

  it ('Should JinHo have three friends', function (done) {
    User.findOne({ name: 'JinHo' }).select('friend_list')
      .exec(function (err, data) {
        var friends = data.friend_list.split(',');
        expect(friends.length).to.equal(3);
        done();
    });
  });

  it ('Should not have JinHo', function (done) {
    User.remove({ name: 'JinHo'})
      .exec(function () {
        User.findOne({ name: 'JinHo' })
          .exec(function (err, person) {
            expect(person).to.equal(null);
            done();
          });
      });
  });
});
