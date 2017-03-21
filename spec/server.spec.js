var app = require('../server.js');
var request = require('supertest');
var expect = require('chai').expect;

describe('Test Mocha', function() {
  it('Should answer GET requests for / with a 200 status code', function(done) {
    request(app)
      .get('/')
      .expect(404, done);
  });
});
