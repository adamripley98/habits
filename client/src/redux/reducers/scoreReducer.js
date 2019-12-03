import {
  LOAD_SCORES_REQUEST, LOAD_SCORES_SUCCESS, LOAD_SCORES_FAILURE,
} from '../types';
/**
 * Reducer which handles all events related to user authentication process
 */
const scoreReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SCORES_REQUEST: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.success = null;
      newState.error = null;
      return newState;
    }
    case LOAD_SCORES_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.scores = action.scores;
      newState.pending = false;
      newState.success = action.success;
      newState.error = null;
      return newState;
    }
    case LOAD_SCORES_FAILURE: {
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

export default scoreReducer;
