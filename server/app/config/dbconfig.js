const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: '10.0.0.9',
  user: 'root',
  password: 'memadev',
  database: 'echodeskDev',
});

module.exports = pool;
