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
            SELECT p.*, pc.*
            FROM post p
            LEFT JOIN postcategory pc ON p.id = pc.postId
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

exports.selectPostDetail = async function (postId) {
  try {
    // DB연결 검사
    const connection = await pool.getConnection(async conn => conn);

    const makeSQLQuery = (table, column) => {
      return ` SELECT ${column} FROM ${table} WHERE ${table}.${table === 'post' ? 'id' : 'postId'} = ?`;
    };
    try {
      // 쿼리
      const [data] = await connection.query(makeSQLQuery('post', '*'), [postId]);
      const [postcategory] = await connection.query(makeSQLQuery('postcategory', 'id, category'), [postId]);
      const [images] = await connection.query(makeSQLQuery('upload', 'id, image'), [postId]);

      const postDetailData = { ...data[0], postcategory, images };
      console.log(postDetailData, '/2323/');
      return postDetailData;
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
