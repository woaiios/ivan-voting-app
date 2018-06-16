import React from 'react';
import axios from 'axios';

const LoginState = Object.freeze({
      Unknow: "0",
      Login: "1",
      Logout: "2"
    });

class LoginComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.loginfb.bind(this);
    this.checkLoginState.bind(this);
    this.statusChangeCallback.bind(this);
    this.state = {isLoggedIn: LoginState.Unknow};
  }

  componentDidMount() {
    this.fbinit();
    this.loadFBSDK();
  }

  statusChangeCallback(response) {
    console.log("statusChangeCallback");
    console.log(response);
    if (response.status === "connected") {
      this.setState({isLoggedIn: LoginState.Login});
      let jsc = JSON.stringify(response); 
      axios.post('https://ivan-voting-app.glitch.me/fblogin',{ID:12345, d:jsc})
      .then(function (response) {
        console.log(response);
      })
    } else {
      this.setState({isLoggedIn: LoginState.Logout});
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
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "479882055764108",
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.8" // use graph api version 2.8
      });
      this.checkLoginState();
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
    window.FB.login( (res) => {
          console.log(res);
        },
        { scope: "pubic_profile,email" }
    );
  }
  
  logoutfb() {
    window.FB.logout(function(response) {
      // Person is now logged out
    });
  }
  
  render() {
    let button;
    if (this.state.isLoggedIn == LoginState.Login) {
      button = <button className="btn btn-primary" onClick={this.logoutfb.bind(this)}>logout facebook</button>;
    } else if (this.state.isLoggedIn == LoginState.Logout){
      button = <button className="btn btn-primary" onClick={this.loginfb.bind(this)}>login facebook</button>;
    } else {
      button = <button className="btn btn-primary">login facebook</button>;
    }
    return (
      <div className={this.props.className}>
          {button}
      </div>
    );
  }
  
}

export default LoginComponent;
