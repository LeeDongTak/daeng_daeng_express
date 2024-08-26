const indexDao = require('../dao/indexDao');

exports.readPost = async function (req, res) {
  const { pageNum } = req.params;

  const result = await indexDao.selectPost(pageNum);

  if (!result) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '갤러리 조회 실패 관리자에게 문의하세요',
    });
  }

  return res.send(result);
};

exports.readPostDetail = async function (req, res) {
  const { postId } = req.params;

  const result = await indexDao.selectPostDetail(postId);

  if (!result) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '갤러리 조회 실패 관리자에게 문의하세요',
    });
  }
  // console.log(result);
  return res.send(result);
};
