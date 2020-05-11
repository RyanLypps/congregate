const defaultState = {
  };
  
  export default function appReducer(state = defaultState, action) {
    const { type, payload } = action;
  
    switch (type) {
     
      default: {
        return state;
      }
    }
  }