const mysql = require("mysql2/promise"); // Import mysql2 with promises support
require("dotenv").config();

// Create a pool instead of a connection
const pool = mysql.createPool({
  host: "localhost",
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = async (query, params) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(query, params);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Query Error: ", error);
    throw error;
  }
};
