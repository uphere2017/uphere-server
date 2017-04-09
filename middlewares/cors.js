// CORS Headers
var allowCORS = function (req, res, next) {

  var allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://uphere.world',
    'http://jino.world.s3-website.ap-northeast-2.amazonaws.com'
  ];
  var origin = req.headers.origin;

  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token');

  if ('OPTIONS' === req.method) {
    res.send(200);
    return;
  }
  return next();
};

module.exports = allowCORS;
