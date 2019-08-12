import {
  REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST,
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT,
} from '../types';
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
      newState.name = action.user.name;
      newState.email = action.user.email;
      newState.userId = action.user.userId;
      newState.pending = false;
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
    case LOGIN_REQUEST: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.success = null;
      newState.error = null;
      return newState;
    }
    case LOGIN_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.name = action.user.name;
      newState.email = action.user.email;
      newState.userId = action.user.userId;
      newState.pending = false;
      newState.success = action.success;
      newState.error = null;
      return newState;
    }
    case LOGIN_FAILURE: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.success = null;
      newState.error = action.error;
      return newState;
    }
    case LOGOUT: {
      const newState = Object.assign({}, state);
      newState.name = null;
      newState.email = null;
      newState.userId = null;
      return newState;
    }
    default:
      return state;
  }
};

export default authReducer;
