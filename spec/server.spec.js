var app = require('../server.js');
var request = require('supertest');
var expect = require('chai').expect;

describe('Test Mocha', function() {
  it('Should answer GET requests for / with a 200 status code', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('Should be Content text is Hello Uphere', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html')
      .expect(200)
      .end(function(err, res){
        expect(res.text).to.equal('Hello Uphere');
        done();
      });
  });

});
