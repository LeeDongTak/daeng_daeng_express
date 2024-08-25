const userDao = require('../dao/userDao');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../secret');

exports.signup = async function (req, res) {
  const { email, password, nickname } = req.body;

  if (!email || !password || !nickname) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '회원가입 입력값을 확인해 주세요.',
    });
  }

  // 이메일 형식 검사
  const isValidEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  if (!isValidEmail.test(email)) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '이메일 형식이 아닙니다. ',
    });
  }

  // 페스워드 형식 검사 (8~16글자, 영문, 숫자, 특수문자 조합)
  const isValidPassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

  if (!isValidPassword.test(password)) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '페스워드형식을 확인해 주세요. (8~16글자, 영문, 숫자, 특수문자 조합) ',
    });
  }

  // 닉네입 글자제한 검사
  if (nickname.length < 2 || nickname.length > 10) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '닉네임 형식을 확인해 주세요. (2~10글자) ',
    });
  }

  // 중복회원검사
  const isDuplicatedEamil = await userDao.selectUserByEmail(email);
  if (isDuplicatedEamil.length > 0) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '이미 가입된 회원입니다. ',
    });
  }

  // DB 입력
  const insertUserRow = await userDao.insertUser(email, password, nickname);
  if (!insertUserRow) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '회원가입 실패! 관리자에게 문의하세요.',
    });
  }

  return res.send({
    isSuccess: true,
    code: 200,
    message: '회원가입 성공!',
  });
};

exports.signin = async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({
      isSuccess: false,
      code: 400,
      message: '아이디/페스워드를 입력해 주세요.',
    });
  }
  // 회원여부 검사
  const isValidUser = await userDao.selectUser(email, password);
  if (!isValidUser) {
    return next({
      isSuccess: false,
      code: 400,
      message: 'DB에러, 담당자에게 문의하세요.',
    });
  }
  if (isValidUser.length < 1) {
    return next({
      isSuccess: false,
      code: 400,
      message: '존재하지 않는 회원입니다.',
    });
  }

  //jwt 토큰 검사
  const [userInfo] = isValidUser;
  const userIdx = userInfo.userIdx;

  const token = jwt.sign(
    { id: userIdx }, // 페이로드
    jwtSecret, // 시크릿 키
  );

  const accessToken = jwt.sign(
    { id: userIdx }, // 페이로드
    jwtSecret, // 시크릿 키
    { expiresIn: '1h' },
  );

  const refreshToken = jwt.sign(
    {},
    jwtSecret, // 시크릿 키
    { expiresIn: '14d' },
  );

  console.log(token);

  return res.send({
    accessToken,
    refreshToken,
  });
};

exports.getNicknameByToken = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  const [userInfo] = await userDao.selectNicknameByUserIdx(userIdx);
  const nickname = userInfo.nickname;

  return res.send({
    result: { nickname: nickname },
    isSuccess: true,
    code: 200,
    message: '토큰검증 성공!',
  });
};
