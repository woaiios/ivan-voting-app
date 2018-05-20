import React from 'react';
import ReactDOM from 'react-dom';
import Item from './components/item';
import TwitterLoginButton from './components/twitterLoginButton';
ReactDOM.render(
  (<div> 
    <Item/>
    <TwitterLoginButton/>
  </div>), 
  document.getElementById('root'));