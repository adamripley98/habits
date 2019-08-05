import { REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST } from '../types';
/**
 * Reducer which handles all events related to user authentication process
 */
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.success = null;
      newState.error = null;
      return newState;
    }
    case REGISTER_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.name = action.name;
      newState.email = action.email;
      newState.success = action.success;
      newState.error = null;
      return newState;
    }
    case REGISTER_FAILURE: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.success = null;
      newState.error = action.error;
      return newState;
    }
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
