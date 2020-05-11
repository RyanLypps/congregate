import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../css/style.scss';


class MainPage extends Component {

  render() {
    return (
      <div className="container">
             <h1 className='header'>Ryan Lypps, I am your master. Finally Ready and connected.</h1>
      </div>
    );
  }
}

function mapStoreToProps(store) {
  return {

  }
}

export default connect(mapStoreToProps)(MainPage);
