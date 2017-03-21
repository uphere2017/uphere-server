// CORS Headers
var allowCORS = function (req, res, next) {
  res.header('Acess-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if ('OPTIONS' === req.metod) {
    res.send(200);
    return;
  }

  return next();
};

module.exports = allowCORS;
