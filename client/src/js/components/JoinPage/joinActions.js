
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