const mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
  fbId:String,
  fbToken:String,
  fbExpiresAt:Number,
  fbName:String,
  fbPicture:String,
  fbEmail:String,
  updateTime:Number
});

var User = mongoose.model('User', UserSchema);

module.export = User;