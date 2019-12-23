import axios from 'axios';
import {
  LOAD_RELATIONSHIPS_REQUEST, LOAD_RELATIONSHIPS_SUCCESS, LOAD_RELATIONSHIPS_FAILURE,
  ADD_FRIEND_FAILURE, ADD_FRIEND_SUCCESS, ADD_FRIEND_REQUEST,
  ACCEPT_FRIEND_FAILURE, ACCEPT_FRIEND_SUCCESS, ACCEPT_FRIEND_REQUEST,
  REJECT_FRIEND_FAILURE, REJECT_FRIEND_SUCCESS, REJECT_FRIEND_REQUEST,
  LOAD_FRIEND_CONTENT_SUCCESS, LOAD_FRIEND_CONTENT_FAILURE, LOAD_FRIEND_CONTENT_REQUEST,
} from '../types';

/*
Action to load relationships: friends, pending, requests
*/
export function loadRelationships() {
  return (dispatch) => {
    dispatch({
      type: LOAD_RELATIONSHIPS_REQUEST,
    });
    axios.get('/api/relationships')
      .then((resp) => {
        if (resp.data.success) {
          dispatch({
            type: LOAD_RELATIONSHIPS_SUCCESS,
            relationships: resp.data.relationships,
          });
        } else {
          dispatch({
            type: LOAD_RELATIONSHIPS_FAILURE,
            error: resp.data.error,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: LOAD_RELATIONSHIPS_FAILURE,
          error,
        });
      });
  };
}

/*
Action to make a request to add a friend
*/
export function addFriend(friendEmail) {
  return (dispatch) => {
    dispatch({
      type: ADD_FRIEND_REQUEST,
    });
    if (friendEmail) {
      axios.post('/api/relationships/add', {
        friendEmail,
      })
        .then((resp) => {
          if (resp.data.success) {
            dispatch({
              type: ADD_FRIEND_SUCCESS,
              newRelationship: resp.data.newRelationship,
            });
          } else {
            dispatch({
              type: ADD_FRIEND_FAILURE,
              error: resp.data.error,
            });
          }
        })
        .catch(() => {
          dispatch({
            type: ADD_FRIEND_FAILURE,
            error: 'Error adding friend.',
          });
        });
    } else {
      dispatch({
        type: ADD_FRIEND_FAILURE,
        error: 'Error adding friend',
      });
    }
  };
}

/*
Action to accept a request
*/
export function acceptFriend(userId) {
  return (dispatch) => {
    dispatch({
      type: ACCEPT_FRIEND_REQUEST,
    });
    if (userId) {
      axios.post('/api/relationships/accept', {
        userId,
      })
        .then((resp) => {
          if (resp.data.success) {
            dispatch({
              type: ACCEPT_FRIEND_SUCCESS,
            });
          } else {
            dispatch({
              type: ACCEPT_FRIEND_FAILURE,
              error: resp.data.error,
            });
          }
        })
        .catch(() => {
          dispatch({
            type: ACCEPT_FRIEND_FAILURE,
            error: 'Error accepting friend.',
          });
        });
    } else {
      dispatch({
        type: ACCEPT_FRIEND_FAILURE,
        error: 'Error accepting friend',
      });
    }
  };
}

/*
Action to reject a request
*/
export function rejectFriend(userId) {
  return (dispatch) => {
    dispatch({
      type: REJECT_FRIEND_REQUEST,
    });
    if (userId) {
      axios.post('/api/relationships/reject', {
        userId,
      })
        .then((resp) => {
          if (resp.data.success) {
            dispatch({
              type: REJECT_FRIEND_SUCCESS,
            });
          } else {
            dispatch({
              type: REJECT_FRIEND_FAILURE,
              error: resp.data.error,
            });
          }
        })
        .catch(() => {
          dispatch({
            type: REJECT_FRIEND_FAILURE,
            error: 'Error rejecting friend.',
          });
        });
    } else {
      dispatch({
        type: REJECT_FRIEND_FAILURE,
        error: 'Error rejecting friend',
      });
    }
  };
}

/*
Action to load friend's content
*/
export function loadFriendContent() {
  return (dispatch) => {
    dispatch({
      type: LOAD_FRIEND_CONTENT_REQUEST,
    });
    axios.get('/api/relationships/content')
      .then((resp) => {
        if (resp.data.success) {
          const scores = [];
          resp.data.content.forEach((user) => {
            // Manipulating scores object
            const userObj = {
              name: user.name,
              userId: user.userId,
              profilePicture: user.profilePicture,
              scores: [],
            };
            user.scores.forEach((cat) => {
              let totalScore = 0;
              let totalPossible = 0;
              const possiblePerHabit = 7;
              cat.habits.forEach((hab) => {
                totalScore += hab.score;
                totalPossible += possiblePerHabit;
              });
              userObj.scores.push({
                score: totalScore / totalPossible,
                name: cat.name,
                categoryId: cat.categoryId,
                color: cat.color,
              });
            });
            scores.push(userObj);
          });
          dispatch({
            type: LOAD_FRIEND_CONTENT_SUCCESS,
            content: scores,
          });
        } else {
          dispatch({
            type: LOAD_FRIEND_CONTENT_FAILURE,
            error: resp.data.error,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: LOAD_FRIEND_CONTENT_FAILURE,
          error: 'Error loading content.',
        });
      });
  };
}
