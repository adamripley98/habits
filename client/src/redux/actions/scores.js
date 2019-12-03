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
            const scores = [];
            resp.data.scores.forEach((cat) => {
              // Manipulating scores object
              const catObj = {
                name: cat.name,
                categoryId: cat.categoryId,
                color: cat.color,
                score: 0,
              };
              let totalScore = 0;
              let totalPossible = 0;
              let possiblePerHabit = 1;
              if (period === 'week') {
                possiblePerHabit = 7;
              } else if (period === 'month') {
                possiblePerHabit = 30;
              }
              cat.habits.forEach((hab) => {
                totalScore += hab.score;
                totalPossible += possiblePerHabit;
              });
              catObj.score = totalScore / totalPossible;
              scores.push(catObj);
            });
            dispatch({
              type: LOAD_SCORES_SUCCESS,
              scores,
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
