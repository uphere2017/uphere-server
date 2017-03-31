var User = require('../models/user');
var Relationship = require('../models/relationship');
var jwt = require('jsonwebtoken');
var tokenConfig = require('../config/token');

var getFriendList = function (req, res) {
  var userId = req.params.user_id;

  Relationship.findOne({ host_id: userId })
    .exec(function (err, relationship) {
      if (err) {
        res.sendStatus(500);
      } else if (relationship === null) {
        res.json([]);
      } else {
        var friends = relationship.friends_id;

        User.find({ uphere_id: { $in: friends } })
          .select('-friend_list')
          .exec(function (err, friends) {
            if (err) {
              res.sendStatus(500);
            } else {
              res.status(200).json(friends);
            }
          });
      }
  });
};

var getUserData = function (req, res) {
  User.findOne({ uphere_id: req.params.user_id })
    .then(function (userData) {
      res.send(userData);
    })
    .catch(function (err) {
      res.sendStatus(404);
    });
};

var loginUser = function (req, res) {
  User.findOne({ facebook_id: req.body.facebook_id }, function (err, existingUser) {
    var accessToken = null;

    if (err) {
      return res.sendStatus(500);
    } else if (existingUser) {
      accessToken = jwt.sign({ id: existingUser.facebook_id }, tokenConfig, {
        expiresIn: 2880
      });

      return res.status(200).json({
        user: existingUser,
        accessToken: accessToken
      });
    }

    var user = new User({
      name: req.body.name,
      profile_image_url: req.body.profile_image_url,
      email_address: req.body.email_address,
      facebook_id: req.body.facebook_id
    });

    user.save(function (err, userInfo) {
      var relationship = new Relationship();
      relationship.host_id = userInfo.uphere_id;

      User.find({ facebook_id: { $in: req.body.friend_list } })
        .then(function (friends) {
          relationship.friends_id = friends.map(function (friend) {
            return friend.uphere_id;
          });

          relationship.save(function (err, relationship) {
            if (err) {
              res.sendStatus(500);
            } else {
              relationship.friends_id.forEach(function (friendId) {
                Relationship.update({ host_id: friendId }, { $push: { friends_id: relationship.uphere_id }})
                  .exec(function (err) {
                    if (err) {
                      res.sendStatus(500)
                    }
                  });
              });

              accessToken = jwt.sign({ id: req.body.facebook_id }, tokenConfig, {
                expiresIn: 2880
              });

              res.status(201).send({
                user: userInfo,
                accessToken: accessToken
              });
            }
          });
        });
    });
  });
};

module.exports = {
  getFriendList: getFriendList,
  getUserData: getUserData,
  loginUser: loginUser
};
