const indexDao = require('../dao/indexDao');

exports.readPost = async function (req, res) {
  const { pageNum } = req.params;

  //   let todos = {};
  //   const types = ["do", "decide", "delete", "delegate"];
  //   for (let type of types) {
  //     const selectTodoByTypeRows = await indexDao.selectTodoByType(userIdx, type);
  //     if (!selectTodoByTypeRows) {
  //       return res.send({
  //         isSuccess: false,
  //         code: 400,
  //         message: "일정 조회 실패 관리자에게 문의하세요",
  //       });
  //     }

  //     todos[type] = selectTodoByTypeRows;
  //   }

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
