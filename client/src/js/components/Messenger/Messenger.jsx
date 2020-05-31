import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  sendMessage,
  clearField,
  getUserName,
  getChatRoom,
} from '../JoinPage/joinActions';

let tempMsgArr = [];

class Messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageArr: [],
      usersArr: [],
    }

    // this.name = this.name.bind(this);
    // this.room = this.room.bind(this);
    this.joinChatRoom = this.joinChatRoom.bind(this);
    this.message = this.message.bind(this);

  }

  joinChatRoom(username, chatRoom) {
    const { dispatch } = this.props;
    let chatRoomInfo = {
      username: username,
      chatRoom: chatRoom
    }

    this.props.socket.emit('newUser', chatRoomInfo);

    dispatch(clearField());
  }

  leaveChatRoom() {
    this.props.socket.emit('leaveChatRoom');
  }

  sendMessage(message) {
    const { dispatch } = this.props;
    let sendMessage = {
      message: message
    }

    this.props.socket.emit('sendMessage', sendMessage);
    sendMessage = {};

    dispatch(clearField());

    this.focusMessageInput.focus();

  }

  componentDidMount() {
    this.joinChatRoom(this.props.username, this.props.chatRoom);

    this.props.socket.on('message', data => {

      console.log(data.user + ': ' + data.msg.message);

      tempMsgArr.push(data.msg.message);

      this.setState({
        messageArr: tempMsgArr
      });

    });

    this.props.socket.on('welcomeToRoom', data => {
      console.log(data);
    });

    this.props.socket.on('hasJoinedRoom', data => {
      console.log(data);
    });

    this.props.socket.on('leftChat', data => {
      console.log(data);
    });

    this.props.socket.on('onlineUsers', ({ users }) => {

      console.log(users);

      this.setState({
        usersArr: users.map(user => user.username)
      });
    });

  }

  // name(e) {
  //   const { dispatch } = this.props;
  //   const { value } = e.target;
  //   dispatch(getUserName(value));
  // }
  // room(e) {
  //   const { dispatch } = this.props;
  //   const { value } = e.target;
    // dispatch(getChatRoom(value));
  // }

  message(e) {
    const { dispatch } = this.props;
    const { value } = e.target;
    dispatch(sendMessage(value));
  }

  render() {
    console.log(this.props.chatRoom);
    return (
      <div>
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
        <form onSubmit={(e) => { e.preventDefault(); this.sendMessage(this.props.message) }}>
          <input ref={(input) => { this.focusMessageInput = input; }} className='message-input' name='message-field' type='text' value={this.props.message} onChange={this.message} maxLength='500'></input>
          <button onClick={() => this.sendMessage(this.props.message)}>Chat</button>
        </form>
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
    socket: store.joinPage.socket,
    username: store.joinPage.username,
    message: store.joinPage.message,
  }
}

export default connect(mapStoreToProps)(Messenger);

