import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";
import {
  getMessage
} from './messengerAction';

 class Messenger extends Component {
  constructor(props) {
    super(props);
    
    this.updateMessage = this.updateMessage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    
    // this.socket = io.connect(`http://localhost:3000`, { transports: ['websocket'] });
  }

  updateMessage(e) {
    const {dispatch} = this.props;
    const {value} = e.target;
    dispatch(getMessage(value))
  };


  handleSubmit(event) {
    const {message} = this.props;
    event.preventDefault();
    this.socket.emit('sendMessage', message)
  }

  // componentDidMount() {
  //   this.socket.on('message', (data) => {
  //     const msg = data;
  //     console.log('Ryan: ' + msg);
  //   }) 
  // }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.props.message} onChange={this.updateMessage}></input>
          <button>send</button>
        </form>
      </div>
    )
  }
}


function mapStoreToProps(store) {
  
  return {
    chatRoom: store.joinPage.chatRoom,
    username: store.joinPage.username,
    message: store.messenger.message,
  }
}

export default connect(mapStoreToProps)(Messenger);

