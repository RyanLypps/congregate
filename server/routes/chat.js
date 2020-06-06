const express = require("express");
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const path = require('path');

router.get("/", (req, res) => {

  res.sendFile(path.join(__dirname, '../../dist/index.html'));

  // mysqlConnection.query('CREATE DATABASE chatDB DEFAULT CHARACTER SET utf8', (err, rows, fields) => {



  //   if(!err) {
  //     {
  //       console.log(rows);
  //       console.log('chatDB created!'); 
  //     }
  //   } else {
  //     throw err;
  //   }
  // });

  // mysqlConnection.query('CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))', (err, rows, fields) => {

  //   if(!err) {
  //     {
  //       console.log(rows);
  //       console.log(fields);
  //       console.log('table created!'); 
  //     }
  //   } else {
  //     throw err;
  //   }
  // });

  // mysqlConnection.query('ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY', (err, rows, fields) => {

  //   if(!err) {
  //     {
  //       console.log(rows);
  //       console.log(fields);
  //       console.log('table created!'); 
  //     }
  //   } else {
  //     throw err;
  //   }
  // });

  // mysqlConnection.query("INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')", (err, rows, fields) => {

  //   if(!err) {
  //     {
  //       console.log(rows);
  //       console.log(fields);
  //       console.log('result inserted!'); 
  //     }
  //   } else {
  //     throw err;
  //   }

  // });

});

router.post("/", (req, res) => {

  console.log('why run twice?');

  let messageFromChatRoom = req.body.message.message;

  if (messageFromChatRoom.length != 0) {

    mysqlConnection.query(`INSERT INTO customers (name, address) VALUES ('${messageFromChatRoom}', 'Highway 37')`, (err, rows, fields) => {

      if (!err) {
        {
          console.log(rows);
          console.log(fields);
          console.log('result inserted!');
        }
      } else {
        throw err;
      }

    });
  }

});

module.exports = router;