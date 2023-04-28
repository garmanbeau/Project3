//This file will run on a node server on the vps
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json({type:'application/json', limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));
app.use(express.json());

const conn = mysql.createConnection({

  host:'localhost',
  user:'wpuser',
  password:'password',
  database:'wpdb',

});

const server = app.listen(3000, function(){
  const host = server.address().address
  const port = server.address().port
});

conn.connect(function(error){
 if(error){
    console.log(error);
 } else{
    console.log("connected");
 }
});

app.get('/search', function(req, res){
  conn.query('select * from music' ,function(error, rows, fields){
    if(error){
      console.log(error);
    }else{
      console.log(rows);
      res.send(rows);
    }
  });
});

app.post('/add', (req, res) => {

  const name = req.body.name;
  const artist = req.body.artist;
  const genre = req.body.genre;
  const imageuri = req.body.imageuri; 

  console.log(imageuri);
  conn.query('INSERT INTO music (name, artist, genre, imageuri) values (?, ?, ?, ?)', 
  [name, artist, genre, imageuri], (err, result) => {
      if(err) {
        console.log(err)
      } else {
        res.send("Values Inserted");
      }
    }
  )
});