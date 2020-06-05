const express = require("express");
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const path = require('path');

router.get("/", (req, res) => {

  mysqlConnection.query('SELECT * from chat.chatroom_history', (err, rows, fields) => {


    res.sendFile(path.join(__dirname, '../../dist/index.html'));

    if(!err) {
      {
        console.log(rows);
      }
    } else {
      console.log(err);
    }
  })

});

router.post("/", (req, res) => {

  let ok ={
    message: 'ok'
  }
  res.send(ok)

});

module.exports = router;