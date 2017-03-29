var jwt = require('jsonwebtoken');
var tokenConfig = require('../config/token');
var User = require('../models/user');

module.exports = function (req, res, next) {
  var token = req.headers['x-access-token'];

  var decoded = jwt.verify(token, tokenConfig);
  if (token) {
    jwt.verify(token, tokenConfig, function (err, decoded) {
      if (err) {
        return res.json({ error: true });
      }

    User.findOne({ facebook_id: decoded.id })
      .then(function (userData) {
        req.decoded = decoded;
        next();
      })
      .catch(function (err) {
        res.sendStatus(404);
      });
    })
  } else {
    return res.status(403).send({
      error: true
    });
  }
};
