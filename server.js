var express = require('express');
const app = new express();

app.listen(8080, function() {
    console.log('Express listening on port')
});

app.get('/', function(req, res){
  res.send('Hello World');
});

module.exports = app;
