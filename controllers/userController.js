var User = require('../models/user');

var getFriendList = function (req, res) {
  var userId = req.params.user_id;
  User.findOne({ _id: userId }).exec()
    .then(function (userData) {
      var friends = userData.friend_list.split(',');
      User.find({ facebook_id: { $in: friends } }).select('-friend_list').exec(function (err, friendList) {
        if (err) {
          res.sendStatus(404);
        }
        res.json(friendList);
      });
    })
    .catch(function(err) {
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

module.exports = {
  getFriendList: getFriendList,
  getUserData: getUserData
};
