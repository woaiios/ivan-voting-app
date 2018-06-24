const User = require('./user').User;
const mongoose = require('mongoose');
const joi = require('joi');

var PollSchema = mongoose.Schema({
  title:String,
  options:[String]
});

module.exports = function (req, res) {
let data = req.body;
  if (!data.uid || !data.token || !data.title || !data.options) {
    res.json({err:"refued"});
    return;
  }
    
  if (data.uid.length <= 0 || data.token.length <= 0) {
    res.json({err:"hehe"});
    return;
  }
  if (data.title.length < 10 || data.title.length > 50) {
    res.json({err:"title length in 10~50"});
    return;
  }
  if (data.options.length < 2 || data.options.length > 1000) {
    res.json({err:"option count in 2~1000"});
    return;
  }
  
  if (data.options.jion('').length > 1000*100) {
    res.json({err:"data too big"});
    return;
  }
  let user = fbUser(data.uid, function(err, user){
    if (err) {
      res.json({err:"db err"});
      return;
    }
    if (user.token != data.token) {
      console.log("err token");
      res.json({err:'err token'});
      return;
    }
    if((Date.now() / 1000) < user.fbExpiresAt) {
      console.log("token expired");
      res.json({err:'token expired'});
      return;
    }
    
  }); 
}

function fbUser(uid, callback) {
  User.findOne({fbId:uid}, function(err, user) {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }
    if (!user) {
      console.log("no user");
      callback({err:"no user"}, null);
      return;
    }
    callback(null, user);
  });
}
