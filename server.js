var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Express listening on port http://%s:%s', host, port);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://master:djqgldj1234@ds137100.mlab.com:37100/upheredb/');

var db = mongoose.connection;
db.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err)
});
db.once('open', function () {
    console.log('Connected to mongodb server')
});

var allowCORS = function(req, res, next) {
  res.header('Acess-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' === req.metod) {
    res.send(200);
  } else {
    return next();
  }
};
 
 // 이 부분은 app.use(router)전에 추가
app.use(allowCORS);

module.exports = app;
