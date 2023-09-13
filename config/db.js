const mysql = require("mysql")
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Abc123456@',
  database: 'class_admin',
})

module.exports = db
