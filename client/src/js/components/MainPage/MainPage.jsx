import React, { Component } from 'react'
import io from "socket.io-client";

 class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    }
    this.updateState = this.updateState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.socket = io.connect(`http://localhost:3000`, { transports: ['websocket'] });
  }

  updateState(e) {
    this.setState({
      message: e.target.value
    })
  };

  handleSubmit(event) {
    const {message} = this.state;
    event.preventDefault();
    this.socket.emit('sendMessage', message)
  }

  componentDidMount() {
    this.socket.on('message', (data) => {
      const msg = data;
      console.log('Ryan: ' + msg);
    }) 
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.props.message} onChange={this.updateState}></input>
          <button>submit</button>
        </form>
      </div>
    )
  }
}

export default MainPage;
