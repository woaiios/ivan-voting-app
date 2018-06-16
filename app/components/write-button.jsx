import React from 'react';

class Pen extends React.Component {
  render () {
    return (
      <div className={this.props.className}>
        <button className="btn btn-info">pen</button>
      </div>
    );
  }
}

export default Pen;