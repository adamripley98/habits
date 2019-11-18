import axios from 'axios';
import {
  ADD_CAT_REQUEST, ADD_CAT_SUCCESS, ADD_CAT_FAILURE,
  LOAD_HABITS_REQUEST, LOAD_HABITS_SUCCESS, LOAD_HABITS_FAILURE,
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
      axios.post('/api/category/add', {
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
