const defaultState = {
  username: '',
  chatRoom: '',
  message: '',
  socket: '',
};

export default function joinReducer(state = defaultState, action) {
  const { type, payload } = action;
  
  switch(type) {
      case "UPDATE_USERNAME": {
          return {
              ...state,
              username: payload
          }
      }

      case "UPDATE_CHATROOM": {
        return {
            ...state,
            chatRoom: payload
        }
    }

      case "SEND_MESSAGE": {
        return {
            ...state,
            message: payload
        }
    }

      case "CLEAR_FIELD": {
        return {
            ...state,
            message: '',
            chatRoom: '',
            username: '',
        }
    }

      case "SEND_SOCKET": {
        return {
            ...state,
            socket: payload
        }
    }

    default: return state;
  }
}