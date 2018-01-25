//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var bodyParser = require('body-parser');


// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser


// Console will print the message
console.log('Server started');


var router = express();
var server = http.createServer(router);
// var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.post('/', function(req,res){
  console.log(req.body.email);
  addEmailtoMailchimp(req.body.email);
  res.end("success!!!");
})

function addEmailtoMailchimp(email){
  var request = require("request");

  var options = { method: 'POST',
    url: 'https://us17.api.mailchimp.com/3.0/lists/8b40e69dd6/members',
    headers: 
     { 'Postman-Token': '0411d65a-d99c-bc0e-653c-e6411c3b471a',
       'Cache-Control': 'no-cache',
       Authorization: 'Basic c3RocGhvZW5peDpmYmY4NDAzYTg0ZTMwNzE5MGVlZmE3OWQ4NGIyYTRhYy11czE3',
       'Content-Type': 'application/json' },
    body: 
     { email_address : email,
       status: 'subscribed' },
    json: true };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});