const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: '10.195.103.107',
  user: 'root',
  password: 'memadev',
  database: 'echodeskDev',
});

module.exports = pool;
