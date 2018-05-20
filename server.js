var express = require('express');
var app = express();
var axios = require('axios');
app.use(express.static('public'));
app.get("/", function (request, response) {
  let callbackUrl = "https://ivan-voting-app.glitch.me/twitter-callback";
  axios.post('https://api.twitter.com/oauth/request_token',{
    oauth_callback:callbackUrl,
    consumer_key:process.env.tck,
    consumer_secret:process.env.tcks
  })
  .then(function (res) {
    console.log(res)
  })
  .catch(function (err) {
    console.log(err)
  });
  response.sendFile(__dirname + './index.html');
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
