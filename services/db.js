const mysql = require('mysql2/promise');
const helper = require('../helper');
const config = require('../config');

const pool = mysql.createPool(config.db);

async function query(db_info, sql, params) {
    const connection = await mysql.createConnection(db_info);
    const [results, ] = await connection.execute(sql, params);
    connection.destroy();
    return results;
}

async function runTransaction(data) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    await Promise.all([
      data.map((row) => connection.query(row.sql_query,row.sql_values))
    ]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    return {success: false , message : error};
  } finally {
    await connection.release();
    return {success: true, message: "transaction complete"}
  }
}

module.exports = {
  query,
  runTransaction
}