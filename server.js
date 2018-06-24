const express = require('express');
const mongoose = require('mongoose');
const poll = require('./poll');
const login = require('./login');

var isDbConnected = false;
const dbUrl = process.env.dbUrl;

mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  isDbConnected = true;
});

var app = express();

app.use(express.static('public'));
app.get("/", function (request, response) {
  response.sendFile(__dirname + './index.html');
});
app.use(express.json());
app.use(express.urlencoded());

app.post('/new-poll', function (req, res) {
  poll(req, res);
});

app.post("/fblogin", function (req, res) {
  login(req, res);
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
