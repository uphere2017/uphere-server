var express = require('express');
const app = new express();


app.get('/', function(req, res){
  res.send('Hello World');
});

app.listen(8080, function() {
    console.log('Express listening on port http://%s:%s');
});

module.exports = app;
