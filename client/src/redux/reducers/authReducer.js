import {
  REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST,
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS,
  SYNC_SUCCESS, SYNC_FAILURE, SYNC_REQUEST,
  FORGOT_FAILURE, FORGOT_REQUEST, FORGOT_SUCCESS,
  RESET_REQUEST, RESET_FAILURE, RESET_SUCCESS,
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
    case LOGOUT_REQUEST: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.error = null;
      newState.success = null;
      return newState;
    }
    case LOGOUT_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.error = null;
      newState.success = true;
      newState.name = null;
      newState.email = null;
      newState.userId = null;
      return newState;
    }
    case LOGOUT_FAILURE: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.error = action.error;
      newState.success = false;
      newState.name = null;
      newState.email = null;
      newState.userId = null;
      return newState;
    }
    case SYNC_REQUEST: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.error = null;
      newState.success = null;
      return newState;
    }
    case SYNC_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.error = null;
      newState.success = true;
      return newState;
    }
    case SYNC_FAILURE: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.error = action.error;
      newState.success = false;
      newState.name = null;
      newState.email = null;
      newState.userId = null;
      return newState;
    }
    case FORGOT_REQUEST: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.error = null;
      newState.success = null;
      return newState;
    }
    case FORGOT_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.error = null;
      newState.success = true;
      return newState;
    }
    case FORGOT_FAILURE: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.error = action.error;
      newState.success = false;
      return newState;
    }
    case RESET_REQUEST: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.error = null;
      newState.success = null;
      return newState;
    }
    case RESET_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.error = null;
      newState.success = true;
      return newState;
    }
    case RESET_FAILURE: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.error = action.error;
      newState.success = false;
      return newState;
    }
    default:
      return state;
  }
};

export default authReducer;
