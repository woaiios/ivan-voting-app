var express = require('express');
var app = express();

app.use(express.static('public'));
app.get("/", function (request, response) {
  response.sendFile(__dirname + './index.html');
});
app.use(express.json());
app.use(express.urlencoded());

app.post("/fblogin", function (req, res) {
  console.log(req.body);
  console.log("some one call me !");
  res.json({foo: "bar"});
  console.log("I have respone him !");
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
