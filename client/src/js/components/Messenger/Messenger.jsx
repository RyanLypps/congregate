import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";

 class Messenger extends Component {
  constructor(props) {
    super(props);

  }

  // getSocket() {
    
  // }

  // componentDidMount() {

  // }

  render() {
    console.log(this.props.socket);
    console.log(this.props.chatRoom);
    return (
      <div>
        <h1>Ryan is Alive</h1>
      </div>
    )
  }
}


function mapStoreToProps(store) {
  
  return {
    chatRoom: store.joinPage.chatRoom,
    socket: store.joinPage.socket,
  }
}

export default connect(mapStoreToProps)(Messenger);

