import {
  ADD_CAT_REQUEST, ADD_CAT_SUCCESS, ADD_CAT_FAILURE,
  ADD_HABIT_REQUEST, ADD_HABIT_SUCCESS, ADD_HABIT_FAILURE,
  LOAD_HABITS_REQUEST, LOAD_HABITS_SUCCESS, LOAD_HABITS_FAILURE,
  LOAD_HABIT_DATA_FAILURE, LOAD_HABIT_DATA_REQUEST, LOAD_HABIT_DATA_SUCCESS,
} from '../types';
/**
 * Reducer which handles all events related to user authentication process
 */
const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CAT_REQUEST: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.success = null;
      newState.error = null;
      return newState;
    }
    case ADD_CAT_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.habits[action.newCategory] = [];
      newState.pending = false;
      newState.success = action.success;
      newState.error = null;
      return newState;
    }
    case ADD_CAT_FAILURE: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.success = null;
      newState.error = action.error;
      return newState;
    }
    case ADD_HABIT_REQUEST: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.success = null;
      newState.error = null;
      return newState;
    }
    case ADD_HABIT_SUCCESS: {
      const newState = Object.assign({}, state);
      // const newArr = newState.habits[action.newHabit.categoryName].slice();
      // newArr.push(action.newHabit.habitName);
      // newState.habits[action.newHabit.categoryName] = newArr;
      // TODO figure this shit out
      newState.pending = false;
      newState.success = action.success;
      newState.error = null;
      return newState;
    }
    case ADD_HABIT_FAILURE: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.success = null;
      newState.error = action.error;
      return newState;
    }
    case LOAD_HABITS_REQUEST: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.success = null;
      newState.error = null;
      return newState;
    }
    case LOAD_HABITS_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.habits = action.habits;
      newState.pending = false;
      newState.success = action.success;
      newState.error = null;
      return newState;
    }
    case LOAD_HABITS_FAILURE: {
      const newState = Object.assign({}, state);
      newState.pending = false;
      newState.success = null;
      newState.error = action.error;
      return newState;
    }
    case LOAD_HABIT_DATA_REQUEST: {
      const newState = Object.assign({}, state);
      newState.pending = true;
      newState.success = null;
      newState.error = null;
      return newState;
    }
    case LOAD_HABIT_DATA_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.habits = action.habits;
      newState.pending = false;
      newState.success = action.success;
      // TODO date shouldn't be stored as moment
      newState.selectedDate = action.date;
      newState.error = null;
      return newState;
    }
    case LOAD_HABIT_DATA_FAILURE: {
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

export default categoryReducer;
