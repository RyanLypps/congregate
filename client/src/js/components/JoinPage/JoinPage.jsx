import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reset } from 'redux-form';
import io from "socket.io-client";
import {
  getUserName,
  getChatRoom,
  sendMessage,
  clearField
} from './joinActions';

let tempMsgArr = [];
class JoinPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageArr: [],
      usersArr: [],
    }

    this.name = this.name.bind(this);
    this.room = this.room.bind(this);
    this.joinChatRoom = this.joinChatRoom.bind(this);
    this.message = this.message.bind(this);

    this.socket = io.connect(`http://localhost:3000`, { transports: ['websocket'] });

  }

  joinChatRoom(username, chatRoom) {
    const { dispatch } = this.props;
    let chatRoomInfo = {
      username: username,
      chatRoom: chatRoom
    }

    this.socket.emit('newUser', chatRoomInfo);

    dispatch(clearField());
  }

  leaveChatRoom() {
    this.socket.emit('leaveChatRoom');
  }

  sendMessage(message) {
    const { dispatch } = this.props;
    let sendMessage = {
      message: message
    }

    this.socket.emit('sendMessage', sendMessage);
    sendMessage = {};

    dispatch(clearField());

    this.focusMessageInput.focus();

  }

  componentDidMount() {

    this.socket.on('message', data => {
      console.log(data.user + ': ' + data.msg.message);


      tempMsgArr.push(data.msg.message);

      this.setState({
        messageArr: tempMsgArr
      });

    });

    this.socket.on('welcomeToRoom', data => {
      console.log(data);
    });

    this.socket.on('hasJoinedRoom', data => {
      console.log(data);
    });

    this.socket.on('leftChat', data => {
      console.log(data);
    });

    this.socket.on('onlineUsers', ({ users }) => {

      this.setState({
        usersArr: users.map(user => user.username)
      });
    });


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
  message(e) {
    const { dispatch } = this.props;
    const { value } = e.target;
    dispatch(sendMessage(value));
  }

  render() {
    return (
      <div>
        <button onClick={() => this.leaveChatRoom()}>Leave Room</button>
        <h2>Create Username</h2>
        <input type='text' value={this.props.username} onChange={this.name} placeholder='display-name' autoFocus />
        <h2>Create Chatroom</h2>
        <input type='text' value={this.props.chatRoom} onChange={this.room} placeholder='chat-room' />
        <button onClick={() => this.joinChatRoom(this.props.username, this.props.chatRoom)}>Join</button>
        <hr></hr>
        <div>Online Users</div>
        {this.state.usersArr ? this.state.usersArr.map((user, i) => {
          return (
            <div key={i}>
              <h3>
                {user}
              </h3>
            </div>
          );
        }) : <div></div>}
        <form onSubmit={(e) => {e.preventDefault(); this.sendMessage(this.props.message)}}>
          <input ref={(input) => { this.focusMessageInput = input; }} className='message-input' name='message-field' type='text' value={this.props.message} onChange={this.message} maxLength='500'></input>
          <button onClick={() => this.sendMessage(this.props.message)}>Chat</button>
        </form>
        <div></div>
        {this.state.messageArr ? this.state.messageArr.map((message, i) => {
          return (
            <div key={i}>
              <h3>
                {message}
              </h3>
            </div>
          );
        }) : <div></div>}
      </div>
    )
  }
}

function mapStoreToProps(store) {
  return {
    chatRoom: store.joinPage.chatRoom,
    username: store.joinPage.username,
    message: store.joinPage.message,
  }
}

export default connect(mapStoreToProps)(JoinPage);
