const mysql = require('mysql');

let mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ryan_123',
  database: 'chatDB',
  multipleStatements: true,
  port: 3306
});

mysqlConnection.connect((err) => {
  if(!err) {
    console.log('Connected');
  } else {
    console.log('Connection failed');
    console.log(err);
  }
});

module.exports = mysqlConnection;