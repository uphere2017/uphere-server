var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = mongoose.connect('mongodb://master:djqgldj1234@ds137100.mlab.com:37100/upheredb/');
db.on('error', console.error);
db.once('open',  { console.log('Connected to mongodb server')});

app.get('/', function(req, res){
    res.send('Hello Uphere');
});

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Express listening on port http://%s:%s', host, port);
});

module.exports = app;
