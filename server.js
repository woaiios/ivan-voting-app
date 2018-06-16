var express = require('express');
var app = express();

app.use(express.static('public'));
app.get("/", function (request, response) {
  response.sendFile(__dirname + './index.html');
});
app.use(express.json());
app.use(express.urlencoded());

app.post("/fblogin", function (req, res) {
  if (req.body.ID != 12345) {
    res.json({foo:"Err app"});
    return;
  }
  let token = req.body.d;
  res.json({info:"ok"});
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
