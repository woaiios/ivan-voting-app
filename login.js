const axios = require('axios');
const User = require('./user').User;
const fbAppId = process.env.fbAppId;
const fbAppSc = process.env.fbAppSc;

module.export = function (req, res) {
if (req.body.ID != 12345) {
    res.json({foo:"Err app"});
    return;
  }
  let token = JSON.parse(req.body.d);
  checkFbToken(token, function(err, info) {
    if(err) {
      console.log(err);
      res.json({info:JSON.stringify(err)});
      return;
    }
    let user = {
                fbId:info.user_id, 
                fbToken:token.authResponse.accessToken,
                fbExpiresAt:info.expires_at,
                fbSummary:info
                }
    fbProfile(user, function(err, detailInfo) {
      if(err) {
        console.log(err);
        res.json({err: "no user name"});
        return;
      }
      console.log(detailInfo);
      user.updateTime = Date.now();
      user.fbDetail = detailInfo;
      saveFbUser(user, function(err, dbuser) {
        if(err) {
          res.json({err:'db error'});
          return;
        }
        console.log(dbuser);
        res.json({status:0, msg:'ok'});
      });
    });
  });
}

function saveFbUser(user, callback) {
  let fbUser = {
    fbId:user.fbId, 
    fbToken:user.fbToken,
    fbExpiresAt:user.fbExpiresAt,
    fbName:user.fbDetail.name,
    fbPicture:user.fbDetail.picture.data.url,
    fbEmail:user.fbDetail.email
  }
  User.findOneAndUpdate({fbId:user.fbId}, 
                         fbUser, 
                         {new: true, upsert: true},
                         function(err, dbUser){
    if(err) {
      console.log('q user err');
      console.log(err);
      callback(err,null);
      return;
    }
    callback(null, dbUser);
  });
}

function checkFbToken(token, callback) {
  if(token.status != 'connected') {
    callback({err:'unconnected'}, null);
    console.log({err:'unconnected'});
    return;
  }
  let at = token.authResponse.accessToken;
  if (at.length <= 0) {
    callback({err:"err token"}, null);
    console.log('err token');
    return;
  }
  let apptoken = fbAppId + '|' + fbAppSc;
  let fbValiTokenUrl = 'https://graph.facebook.com/debug_token?input_token=' + at + '&access_token=' + apptoken;
   axios.get(fbValiTokenUrl)
     .then(function(res) {
     let data = res.data.data;
     if(data.app_id != fbAppId) {
       callback({err:"not my app"}, null);
       console.log("not my app");
       return;
     }
     if(data.is_valid != true) {
       callback({err:'unvalid token'}, null);
       console.log('unvalid token');
       return;
     }    
     callback(null, res.data.data);   
   })
     .catch(function(err) {
     callback(err, null); 
   })
}

function fbProfile(user, callback) {
  let fbProfileUrl = 'https://graph.facebook.com/v3.0/'+user.fbId+'?access_token='+user.fbToken+'&fields=id,name,gender,email,link,picture&type=large';
  axios.get(fbProfileUrl)
  .then(function(res) {
    callback(null, res.data);
  })
  .catch(function(err){
    callback(err, null);
  })
}