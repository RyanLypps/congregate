import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getUserName,
  getChatRoom
} from './joinActions';

 class JoinPage extends Component {
   constructor(props) {
     super(props);
     this.name = this.name.bind(this);
     this.room = this.room.bind(this);
   }

  joinChatRoom() {
    console.log('JOIN CHATROOM');
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
    console.log(this.props.chatRoom, this.props.username);
    return (
      <div>
        <h2>Create Username</h2>
        <input type='text' value={this.props.username} onChange={this.name} placeholder='display-name'/>
        <h2>Create Chatroom</h2>
        <input type='text' value={this.props.room} onChange={this.room} placeholder='chat-room'/>
        <Link to={'/messenger'}><button onClick={this.joinChatRoom}>Join</button></Link>
      </div>
    )
  }
}

function mapStoreToProps(store) {
  return {
    chatRoom: store.joinPage.chatRoom,
    username: store.joinPage.username
  }
}

export default connect(mapStoreToProps)(JoinPage);
