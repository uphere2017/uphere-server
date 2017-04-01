var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(require('./cors'));
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ parameterLimit: 10000, limit: 1024 * 1024 * 10, extended: true }));
};
