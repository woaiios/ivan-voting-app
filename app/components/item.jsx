import React from 'react';
import axios from 'axios';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.loginfb.bind(this);
    this.checkLoginState.bind(this);
    this.statusChangeCallback.bind(this);
  }

  componentDidMount() {
    this.fbinit();
    this.loadFBSDK();
  }

  statusChangeCallback(response) {
    console.log("statusChangeCallback");
    console.log(response);
    if (response.status === "connected") {
      let jsc = JSON.stringify(response); 
      axios.post('https://ivan-voting-app.glitch.me/fblogin',{ID:12345, d:jsc})
      .then(function (response) {
        console.log(response);
      })
    } else {
      window.FB.login(
        function(res) {
          console.log(res);
        },
        { scope: "pubic_profile,email" }
      );
    }
  }    
  
  checkLoginState() {
    console.log("check")
    window.FB.getLoginStatus((response) => {
      console.log("give me res")
      this.statusChangeCallback(response);
    });
  }
  
  fbinit() {
    console.log("G");
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: "479882055764108",
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.8" // use graph api version 2.8
      });
    };
  }

  loadFBSDK() {
    console.log("here?");
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  loginfb() {
    console.log("hey guy!");
    this.checkLoginState();
  }
  
  render() {
    return (
      <div>
        <button onClick={this.loginfb.bind(this)}>login facebook</button>
      </div>
    );
  }
  
}

export default LoginComponent;
