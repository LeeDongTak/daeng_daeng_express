const { pool } = require('../../database');

exports.insertUser = async function (email, password, nickname) {
  try {
    // DB연결 검사
    const connection = await pool.getConnection(async conn => conn);

    try {
      // 쿼리
      const insertUserQuery = 'insert into MyTodoDB.Users (email, password, nickname) value (?,?,?);';
      const insertUserParams = [email, password, nickname];

      const [row] = await connection.query(insertUserQuery, insertUserParams);
      return row;
    } catch (err) {
      console.error(`### insertUser Query error ### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`### insertUser Query error ### \n ${err}`);
    return false;
  }
};

exports.selectUserByEmail = async function (email) {
  try {
    // DB연결 검사
    const connection = await pool.getConnection(async conn => conn);

    try {
      // 쿼리
      const selectUserByEmailQuery = 'select * from MyTodoDB.Users where email = ?;';
      const selectUserByEmailParams = [email];

      const [row] = await connection.query(selectUserByEmailQuery, selectUserByEmailParams);
      return row;
    } catch (err) {
      console.error(`### selectUserByEmail Query error ### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`### selectUserByEmail Query error ### \n ${err}`);
    return false;
  }
};

exports.selectUser = async function (email, password) {
  try {
    // DB연결 검사
    const connection = await pool.getConnection(async conn => conn);

    try {
      // 쿼리
      const selectUserQuery = 'select * from user where email = ? and password = ?;';
      const selectUserParams = [email, password];

      const [row] = await connection.query(selectUserQuery, selectUserParams);
      return row;
    } catch (err) {
      console.error(`### selectUser Query error ### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`### selectUser Query error ### \n ${err}`);
    return false;
  }
};

exports.selectNicknameByUserIdx = async function (userIdx) {
  try {
    // DB연결 검사
    const connection = await pool.getConnection(async conn => conn);

    try {
      // 쿼리
      const selectNicknameByUserIdxQuery = 'select * from MyTodoDB.Users where userIdx = ?;';
      const selectNicknameByUserIdxParams = [userIdx];

      const [row] = await connection.query(selectNicknameByUserIdxQuery, selectNicknameByUserIdxParams);
      return row;
    } catch (err) {
      console.error(`### selectNicknameByUserIdx Query error ### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`### selectNicknameByUserIdx Query error ### \n ${err}`);
    return false;
  }
};
