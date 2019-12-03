import axios from 'axios';
import {
  LOAD_RELATIONSHIPS_REQUEST, LOAD_RELATIONSHIPS_SUCCESS, LOAD_RELATIONSHIPS_FAILURE,
  ADD_FRIEND_FAILURE, ADD_FRIEND_SUCCESS, ADD_FRIEND_REQUEST,
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
            });
          } else {
            dispatch({
              type: ADD_FRIEND_FAILURE,
              error: resp.data.error,
            });
          }
        })
        .catch((error) => {
          console.log('error', error);
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
