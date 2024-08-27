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
            SELECT p.*,
             JSON_ARRAYAGG(
                JSON_OBJECT(
                  'id', u.id,
                  'postId', u.postId,
                  'image', u.image
                )
              ) AS images,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  'id', pc.id,
                  'category', pc.category,
                  'postId', pc.postId
                )
              ) AS postcategory
            FROM post p
            LEFT JOIN postcategory pc ON p.id = pc.postId
            LEFT JOIN upload u ON p.id = u.postId
            WHERE p.deletedAt IS NULL
            GROUP BY p.id
            LIMIT 16 OFFSET ?
        `,
        [offset],
      );
      console.log(row);
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
      return;
    };
    try {
      // 쿼리
      const [data] = await connection.query(
        `
           SELECT p.*,
             JSON_ARRAYAGG(
                JSON_OBJECT(
                  'id', u.id,
                  'postId', u.postId,
                  'image', u.image
                )
              ) AS images,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  'id', pc.id,
                  'category', pc.category,
                  'postId', pc.postId
                )
              ) AS postcategory
            FROM post p
            LEFT JOIN postcategory pc ON p.id = pc.postId
            LEFT JOIN upload u ON p.id = u.postId
            WHERE p.id = ?
            GROUP BY p.id
          `,
        [postId],
      );

      return data[0];
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
