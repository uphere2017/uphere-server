var express = require('express');
var app = express();
var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Express listening on port http://%s:%s', host, port);
});

app.get('/', function(req, res){
  res.send('Hello World');
});

module.exports = app; 
