const defaultState = {
  username: [],
  chatRoom: [],
  message: '',
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

    default: return state;
  }
}