import axios from 'axios';
import {
  ADD_CAT_REQUEST, ADD_CAT_SUCCESS, ADD_CAT_FAILURE,
  LOAD_HABITS_REQUEST, LOAD_HABITS_SUCCESS, LOAD_HABITS_FAILURE,
  LOAD_HABIT_DATA_REQUEST, LOAD_HABIT_DATA_SUCCESS, LOAD_HABIT_DATA_FAILURE,
  ADD_HABIT_REQUEST, ADD_HABIT_SUCCESS, ADD_HABIT_FAILURE,
  CHECK_HABIT_SUCCESS, CHECK_HABIT_REQUEST, CHECK_HABIT_FAILURE,
} from '../types';

/*
Action to add a category
*/
export function addCategory(name, color) {
  return (dispatch) => {
    dispatch({
      type: ADD_CAT_REQUEST,
    });
    if (name && color) {
      axios.post('/api/categories/add', {
        name,
        color,
      })
        .then((resp) => {
          if (resp.data.success) {
            const { newCategory } = resp.data;
            dispatch({
              type: ADD_CAT_SUCCESS,
              newCategory,
            });
          } else {
            dispatch({
              type: ADD_CAT_FAILURE,
              error: resp.data.error,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: ADD_CAT_FAILURE,
            error,
          });
        });
    }
  };
}

/*
Action to add a habit
*/
export function addHabit(habitName, categoryName) {
  return (dispatch) => {
    dispatch({
      type: ADD_HABIT_REQUEST,
    });
    if (habitName && categoryName) {
      axios.post('/api/habits/add', {
        habitName,
        categoryName,
      })
        .then((resp) => {
          if (resp.data.success) {
            const { newHabit } = resp.data;
            dispatch({
              type: ADD_HABIT_SUCCESS,
              newHabit,
            });
          } else {
            dispatch({
              type: ADD_HABIT_FAILURE,
              error: resp.data.error,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: ADD_HABIT_FAILURE,
            error,
          });
        });
    }
  };
}

/*
Action to load habits
*/
export function loadHabits() {
  return (dispatch) => {
    dispatch({
      type: LOAD_HABITS_REQUEST,
    });
    axios.get('/api/habits')
      .then((resp) => {
        if (resp.data.success) {
          const { habits } = resp.data;
          dispatch({
            type: LOAD_HABITS_SUCCESS,
            habits,
          });
        } else {
          dispatch({
            type: LOAD_HABITS_FAILURE,
            error: resp.data.error,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: LOAD_HABITS_FAILURE,
          error,
        });
      });
  };
}

/*
Action to load habit data for a given date
*/
export function loadHabitDataByDate(date) {
  return (dispatch) => {
    dispatch({
      type: LOAD_HABIT_DATA_REQUEST,
    });
    axios.get(`/api/habits/${date}`)
      .then((resp) => {
        if (resp.data.success) {
          dispatch({
            type: LOAD_HABIT_DATA_SUCCESS,
            habits: resp.data.habits,
            date,
          });
        } else {
          dispatch({
            type: LOAD_HABIT_DATA_FAILURE,
            error: resp.data.error,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: LOAD_HABIT_DATA_FAILURE,
          error,
        });
      });
  };
}

/*
Action to check or uncheck a habit
*/
export function checkHabit(habitId, didComplete, date) {
  return (dispatch) => {
    dispatch({
      type: CHECK_HABIT_REQUEST,
    });
    if (habitId && date) {
      axios.post('/api/habits/check', {
        habitId,
        date,
        didComplete,
      })
        .then((resp) => {
          if (resp.data.success) {
            dispatch({
              type: CHECK_HABIT_SUCCESS,
              habits: resp.data.habits,
            });
          } else {
            dispatch({
              type: CHECK_HABIT_FAILURE,
              error: resp.data.error,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: CHECK_HABIT_FAILURE,
            error,
          });
        });
    } else {
      dispatch({
        type: CHECK_HABIT_FAILURE,
        error: 'Could not check habit.',
      });
    }
  };
}
