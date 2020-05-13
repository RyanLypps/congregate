const defaultState = {
  message: '',
  };
  
  export default function messengerReducer(state = defaultState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case "UPDATE_MESSAGE": {
        return {
            ...state,
            message: payload
        }
    }

     
      default: {
        return state;
      }
    }
  }