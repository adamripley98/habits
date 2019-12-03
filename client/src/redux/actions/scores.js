import axios from 'axios';
import {
  LOAD_SCORES_REQUEST, LOAD_SCORES_SUCCESS, LOAD_SCORES_FAILURE,
} from '../types';

/*
Action to load scores for a given duration
*/
export function loadScores(period) {
  return (dispatch) => {
    dispatch({
      type: LOAD_SCORES_REQUEST,
    });
    if (period) {
      axios.get(`/api/score/${period}`)
        .then((resp) => {
          if (resp.data.success) {
            dispatch({
              type: LOAD_SCORES_SUCCESS,
              scores: resp.data.scores,
            });
          } else {
            dispatch({
              type: LOAD_SCORES_FAILURE,
              error: resp.data.error,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: LOAD_SCORES_FAILURE,
            error,
          });
        });
    }
  };
}
