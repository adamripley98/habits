import {
  LOAD_RELATIONSHIPS_REQUEST, LOAD_RELATIONSHIPS_SUCCESS, LOAD_RELATIONSHIPS_FAILURE,
  ADD_FRIEND_FAILURE, ADD_FRIEND_SUCCESS, ADD_FRIEND_REQUEST,
} from '../types';
/**
 * Reducer which handles all events related to user friendships
 */
const friendReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_RELATIONSHIPS_REQUEST: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.success = null;
      newState.error = null;
      return newState;
    }
    case LOAD_RELATIONSHIPS_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.success = action.success;
      newState.error = null;
      return newState;
    }
    case LOAD_RELATIONSHIPS_FAILURE: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.success = null;
      newState.error = action.error;
      return newState;
    }
    case ADD_FRIEND_REQUEST: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.success = null;
      newState.error = null;
      return newState;
    }
    case ADD_FRIEND_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.success = action.success;
      newState.error = null;
      return newState;
    }
    case ADD_FRIEND_FAILURE: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.success = null;
      newState.error = action.error;
      return newState;
    }
    default:
      return state;
  }
};

export default friendReducer;