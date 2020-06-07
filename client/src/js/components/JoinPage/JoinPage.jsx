import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reset } from 'redux-form';
import io from "socket.io-client";
import {
  getUserName,
  getChatRoom,
  sendSocketToStore
} from './joinActions';

class JoinPage extends Component {
  constructor(props) {
    super(props);

    this.name = this.name.bind(this);
    this.room = this.room.bind(this);

    this.socket = io.connect(`http://localhost:3000`, { transports: ['websocket'] });

  }

  componentDidMount() {

    this.sendSocket();

  }

  sendSocket() {
    const { dispatch } = this.props;

    dispatch(sendSocketToStore(this.socket));
  }

  name(e) {
    const { dispatch } = this.props;
    const { value } = e.target;
    dispatch(getUserName(value));
  }
  room(e) {
    const { dispatch } = this.props;
    const { value } = e.target;
    dispatch(getChatRoom(value));
  }

  render() {
    return (
      <div>
        <h2>Create Username</h2>
        <input type='text' value={this.props.username} onChange={this.name} placeholder='display-name' autoFocus />
        <h2>Create Chatroom</h2>
        <input type='text' value={this.props.chatRoom} onChange={this.room} placeholder='chat-room' />
          <Link to ='/messenger'><button>Join Chat</button></Link>
      </div>
    )
  }
}

function mapStoreToProps(store) {
  return {
    chatRoom: store.joinPage.chatRoom,
    username: store.joinPage.username,
    socket: store.joinPage.socket,
  }
}

export default connect(mapStoreToProps)(JoinPage);
