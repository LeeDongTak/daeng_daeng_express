const { pool } = require('../../database');

exports.getUserRows = async function () {
  try {
    const connection = await pool.getConnection(async conn => conn);

    try {
      const selectUserQuery = 'SELECT * FROM Users;';
      const [row] = await connection.query(selectUserQuery);
      return row;
    } catch (err) {
      console.log('### getUserRows Query error ###');
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

exports.selectPost = async function (pageNum) {
  try {
    // DB연결 검사
    const connection = await pool.getConnection(async conn => conn);

    try {
      // 쿼리
      const offset = (pageNum - 1) * 16;
      const [row] = await connection.query(
        `
            SELECT p.*, pc.*, i.* 
            FROM post p
            LEFT JOIN postcategory pc ON p.id = pc.postId
            LEFT JOIN upload i ON p.id = i.postId
            WHERE p.deletedAt IS NULL
            LIMIT 16 OFFSET ?
        `,
        [offset],
      );
      return row;
    } catch (err) {
      console.error(`### selectTodoByType Query error ### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`### selectTodoByType Query error ### \n ${err}`);
    return false;
  }
};
