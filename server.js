var express = require('express');
var app = express();
var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

var recursion = function() {
    setTimeout(function log() {
        console.log('Hello World');
    }, 100000);
};

recursion();

app.get('/', function(req, res){
    res.send('Hello World');
});

module.exports = app; 
