const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:process.env.PW,
  database:'employees_db'
});

db.connect();

module.exports = db;