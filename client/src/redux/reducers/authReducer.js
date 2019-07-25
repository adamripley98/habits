/**
 * Reducer which handles all events related to user authentication process
 */
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST': {
      const newState = Object.assign({}, state);
      return newState;
    }
    case 'LOGIN_SUCCESS': {
      const newState = Object.assign({}, state);
      return newState;
    }
    case 'LOGIN_FAILURE': {
      const newState = Object.assign({}, state);
      return newState;
    }
    default:
      return state;
  }
};

export default authReducer;
