//데이터 베이스 모두 지우는 게 필요해서 잠시만 닫겠습니다.
/*
var app = require('../server');
var request = require('supertest');
var expect = require('chai').expect;
var Relationship = require('../models/relationship');
var User = require('../models/user');
var Chat = require('../models/chat');
var Counters = require('../models/counters');
var Message = require('../models/message');
var mockData = require('./mockData');

describe('Test Mocha', function () {
  it('Should answer GET requests for / with a 404 status code', function (done) {
    request(app)
      .get('/')
      .expect(404, done);
  });
});

describe('Test user api', function () {

  function makeTest(testCase) {
    it ('Should POST user data', function (done) {
      request(app)
        .post('/users')
        .send(testCase)
        .expect(201)
        .end(done);
    });
  }

  beforeEach(function () {
    for (var data of mockData) {
      makeTest(data);
    }
  });

  it ('Should GET friend-list data', function (done) {
    request(app)
      .get('/users/3/friend-list/')
      .expect(200, done);
  });
});
*/
