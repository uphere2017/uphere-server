var User = require('../models/user');
var Relationship = require('../models/relationship');

var getFriendList = function (req, res) {
  var userId = req.params.user_id;
  User.findOne({_id: userId}).exec()
    .then(function (userData) {
      var friends = userData.friend_list.split(',');
      User.find({facebook_id: {$in: friends}}).select('-friend_list').exec(function (err, friendList) {
        if (err) {
          res.sendStatus(404);
        }
        res.json(friendList);
      });
    })
    .catch(function (err) {
      res.sendStatus(404);
    });
};

var getUserData = function (req, res) {
  User.findOne({ _id: req.params.user_id })
    .then(function (userData) {
      res.send(userData);
    })
    .catch(function (err) {
      res.sendStatus(404);
    });
};

var createUser = function (req, res) {
  var user = new User({
    name: req.body.name,
    profile_image_url: req.body.profile_image_url,
    email_address: req.body.email_address,
    facebook_id: req.body.facebook_id
  });

  user.save()
    .then(function (userInfo) {
      var hostId = userInfo._id;
      var friendsId = req.body.friend_list;

      var relationship = new Relationship();
      relationship.host_id = hostId;
      User.find({facebook_id: {$in: JSON.parse(friendsId)}})
        .then(function (friends) {
          relationship.friends_id = friends.map(function (friend) {
            return friend._id;
          });
          relationship.save(function (err) {
            if (err) {
              res.sendStatus(500);
            } else {
              res.status(201).send({id: hostId});
            }
          })
        });
    });
};

module.exports = {
  getFriendList: getFriendList,
  getUserData: getUserData,
  createUser: createUser
};
