
export function getUserName(username) {
  return {
    type: 'UPDATE_USERNAME',
    payload: username
  }
}

export function getChatRoom(chatRoom) {
  return {
    type: 'UPDATE_CHATROOM',
    payload: chatRoom
  }
}
export function sendMessage(message) {
  return {
    type: 'SEND_MESSAGE',
    payload: message
  }
}
export function clearField() {
  return {
    type: 'CLEAR_FIELD',
  }
}

export function sendSocketToStore(socket) {
  return {
    type: 'SEND_SOCKET',
    payload: socket
  }
}