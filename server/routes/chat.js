const express = require("express");
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const path = require('path');
const moment = require('moment');

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


  // id text person timestamp chatroom 

  // mysqlConnection.query('CREATE TABLE messages (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(300), person VARCHAR(20), timestamp TIMESTAMP, chatroom VARCHAR(30))', (err, rows, fields) => {

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

  // mysqlConnection.query("INSERT INTO messages (text, person, timestamp, chatroom) VALUES ('How are you?', 'BigBoyTim', '2020-06-06 12:00:00', 'Ghosties')", (err, rows, fields) => {

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

  // mysqlConnection.query("DROP TABLE customers", (err, rows, fields) => {

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

  let messageFromChatRoom = req.body.message.message;
  let chatroomName = req.body.message.chatroom;
  let UserThatSentMsg = req.body.message.username;

    mysqlConnection.query(`INSERT INTO messages (text, person, timestamp, chatroom) VALUES ('${messageFromChatRoom}', '${UserThatSentMsg}', '${moment().format()}', '${chatroomName}')`, (err, rows, fields) => {

      if (!err) {
        {
          console.log('message inserted into right schema!');
        }
      } else {
        throw err;
      }

    });

  });
  
  router.get("/info", (req, res) => {

    mysqlConnection.query(`SELECT text FROM messages`, (err, rows, fields) => {

      if (!err) {
        {
          res.send(rows)
          console.log('selected right text!');
        }
      } else {
        throw err;
      }

    });
    
  });


module.exports = router;