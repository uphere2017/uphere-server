var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Q = require('q');
var user = require('./models/user.js');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://master:djqgldj1234@ds137100.mlab.com:37100/upheredb/');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});
db.once('open', function () {
    console.log('Connected to mongodb server');
});

var findUser = Q.nbind(user.find, user);
var createUser = Q.nbind(user.create, user);

app.get('/', function (req, res) {
    res.send('Hello Uphere');
});

app.get('/users/:user_id', function (req, res) {
  findUser({ name: req.params.user_id })
    .then(function (data) {
      res.send(data);
    })
    .fail(function (err) {
      res.send('에러났습니다.');
    });
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Express listening on port http://%s:%s', host, port);
});

module.exports = app;
