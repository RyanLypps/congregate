
export function getMessage(message) {
  return {
    type: 'UPDATE_MESSAGE',
    payload: message
  }
}