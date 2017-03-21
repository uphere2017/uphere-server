var userController = require('../controllers/userController');

module.exports = function (app) {
    /**
     * GET /users/:user_id/friend-list
     *
     * @returns [ { object } ] Each object is friend user data.
     */
    app.get('/users/:user_id/friend-list', userController.getFriendList);
};
