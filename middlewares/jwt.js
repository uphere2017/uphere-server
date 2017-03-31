var jwt = require('jsonwebtoken');
var tokenConfig = require('../config/token');
var User = require('../models/user');

module.exports = function (req, res, next) {
  var authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader) {
    return res.sendStatus(401);
  }

  var token = authorizationHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, tokenConfig, function (err, decodedToken) {
      if (err) {
        return res.sendStatus(403);
      }

      User.findOne({ facebook_id: decodedToken.id })
        .then(function (userData) {
          next();
        })
        .catch(function (err) {
          res.sendStatus(403);
        });
    });
  } else {
    return res.sendStatus(401);
  }
};
