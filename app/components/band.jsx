import React from 'react';

class Band extends React.Component {
  render () {
    return (
      <div className={this.props.className}>
        <h1>Voting</h1>
      </div>
    );
  }
}

export default Band;