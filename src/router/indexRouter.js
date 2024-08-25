const indexController = require('../controller/indexController');
const { jwtMiddleware } = require('../../jwtMiddlewhare');

exports.indexRouter = function (app) {
  app.get('/post/All/:pageNum', indexController.readPost);
};
