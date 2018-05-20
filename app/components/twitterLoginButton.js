import React from 'react';
import axios from 'axios';
class TwitterLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                    isTryLogin: false,
                    isEnable: true
                 };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    console.log(this.state)
    this.setState(prevState => ({
      isEnable: !prevState.isEnable
    }));
  }
  
  render() {
    return (
      <div>
        <button 
          disabled={!this.state.isEnable}
          onClick={this.handleClick}
        >
          TwitterLogin
        </button>
      </div>
    );
  }
}

module.exports = TwitterLoginButton;