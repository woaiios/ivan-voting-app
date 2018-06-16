import React from 'react';
import LoginComponent from './item';
import Band from './band';
import Pen from './write-button';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar fixed-top navbar-light bg-light">
        <Band/>
        <LoginComponent className="ml-auto" />
        <Pen/>
      </nav>
    );
  }  
}

export default Navbar;