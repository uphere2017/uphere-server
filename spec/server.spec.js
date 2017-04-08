var app = require('../server');
var request = require('supertest');
var expect = require('chai').expect;
var Relationship = require('../models/relationship');
var User = require('../models/user');
var Chat = require('../models/chat');
var Counters = require('../models/counters');
var Message = require('../models/message');
var verifyToken = require('../middlewares/jwt');
var mongoose = require('mongoose');
var testDB = require('../config/database');
const badToken = 'yah';

describe('Test Mocha', function () {
  it('Should answer GET requests for / with a 404 status code', function (done) {
    request(app)
      .get('/')
      .expect(404, done);
  });
});

describe('Test Login API', function () {
  before(function(done) {
    mongoose.createConnection(testDB(process.env.NODE_ENV).url, function(error) {
        if (error) console.error('Error while connecting:\n%\n', error);
        console.log('connected');
        done();
    });
  });

  it('Should be able to Login with vaild user ID', function (done) {
    let userLogin = {
      name: "Siwoo Lee",
      profile_image_url: "https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=f0d5b6e66b43161243882411a2d92d75&oe=59606E2F",
      email_address: null,
      facebook_id: 1316601358420317,
      friend_list: [ 301382556946670, 1322190497869189, 1366902353380468, 1434511613286019 ]
    };

    request(app)
      .post('/login')
      .send(userLogin)
      .end(function (err, res) {
        expect(err).to.be.null;
        let data = JSON.parse(res.text);
        expect(data.user.name).to.equal('Siwoo Lee');
        done();
      });
  });
});

describe('Test User API', function () {

  var bearerToken = null;

  before(function (done) {
    let userLogin = {
      name: "Siwoo Lee",
      profile_image_url: "https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=f0d5b6e66b43161243882411a2d92d75&oe=59606E2F",
      email_address: null,
      facebook_id: 1316601358420317,
      friend_list: [ 301382556946670, 1322190497869189, 1366902353380468, 1434511613286019 ]
    };

    request(app)
      .post('/login')
      .send(userLogin)
      .end(function (err, res) {
        let data = JSON.parse(res.text);
        bearerToken = 'Bearer ' + data.accessToken;
        done();
      });
  });

  it ('Should GET secret message', function (done) {
    request(app)
      .get('/secret')
      .expect(200, done);
  });

  it ('Expect secret message to be "Hello, server is live!"', function (done) {
    request(app)
      .get('/secret')
      .end(function (err, res) {
        let data = res.text;
        expect(err).to.be.null;
        expect(data).to.equal('Hello, server is live!');
        done();
      });
  });

  it ('Should GET user data', function (done) {
    request(app)
      .get('/users/1')
      .set('Authorization', bearerToken)
      .expect(200, done);
  });

  it ('Should not be able to GET user data with Error Code 401', function (done) {
    request(app)
      .get('/users/1')
      .set('Authorization', badToken)
      .expect(401, done);
  });

  it ('Should GET chatlist data', function (done) {
    request(app)
      .get('/users/2/chats')
      .set('Authorization', bearerToken)
      .expect(200, done);
  });

  it ('Should not be able to GET chatlist data with Error Code 401', function (done) {
    request(app)
      .get('/users/2/chats')
      .set('Authorization', badToken)
      .expect(401, done);
  });

  it ('Should GET friend-list data', function (done) {
    request(app)
      .get('/users/3/friend-list/')
      .set('Authorization', bearerToken)
      .expect(200, done);
  });

  it ('Should not be able to GET frined-list data with Error Code 401', function (done) {
    request(app)
      .get('/users/3/friend-list/')
      .set('Authorization', badToken)
      .expect(401, done);
  });
});


describe('Test Chatlist API', function () {

  var bearerToken = null;
  var chatId = null;
  var userId = null;

  before(function (done) {
    let userLogin = {
      name: "Siwoo Lee",
      profile_image_url: "https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=f0d5b6e66b43161243882411a2d92d75&oe=59606E2F",
      email_address: null,
      facebook_id: 1316601358420317,
      friend_list: [ 301382556946670, 1322190497869189, 1366902353380468, 1434511613286019 ]
    };

    request(app)
      .post('/login')
      .send(userLogin)
      .end(function (err, res) {
        let data = JSON.parse(res.text);
        userId = data.user.uphere_id;
        bearerToken = 'Bearer ' + data.accessToken;
        done();
      });
  });

  it('Should POST new chatroom to chatlist', function (done) {
    let chat = {
      messages: [],
      participants: [userId, 101]
    };

    request(app)
      .post('/chats')
      .set('Authorization', bearerToken)
      .send(chat)
      .end(function (err, res) {
        expect(res.status).to.equal(201);
        let data = JSON.parse(res.text);
        chatId = data.chat.uphere_id;
        done();
      });
  });

  it('Expect existing chatroom receive 208 Code', function (done) {
    let chat = {
      messages: [],
      participants: [userId, 101]
    };

    request(app)
      .post('/chats')
      .set('Authorization', bearerToken)
      .send(chat)
      .expect(208, done);
  });

  it('Should POST new message to chatroom', function (done) {
    let message = {
      text: 'This is API TEST!',
      sender_id: userId,
      emotion_status: 0,
      created_at: new Date()
    };

    request(app)
      .post('/chats/' + chatId)
      .set('Authorization', bearerToken)
      .send(message)
      .expect(201, done);
  });

  it('Should DELETE chatroom ', function (done) {
    request(app)
      .delete('/chats/' + chatId)
      .set('Authorization', bearerToken)
      .expect(204, done);
  });

});
