const defaultState = {
  username: [],
  chatRoom: [],
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

    default: return state;
  }
}