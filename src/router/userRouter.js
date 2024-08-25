const userController = require('../controller/userController');
const { jwtMiddleware } = require('../../jwtMiddlewhare');

exports.userRouter = function (app) {
  // 회원가입 API
  app.post('/user', userController.signup); // create

  // 로그인 API
  app.post('/auth/sign-in', userController.signin);

  //jwt 검증 API
  app.get('/jwt', jwtMiddleware, userController.getNicknameByToken);
};
