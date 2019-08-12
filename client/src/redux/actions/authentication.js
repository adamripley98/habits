import axios from 'axios';
import {
  REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS,
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS,
  SYNC_FAILURE, SYNC_REQUEST, SYNC_SUCCESS,
} from '../types';
import { checkPassword } from '../../utils/passwordUtils';

// Dispatch login action, will call appropriate reducer (authReducer.js)
export function login(email, password) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    if (email && password) {
      axios.post('/api/login', {
        email,
        password,
      })
        .then((resp) => {
          if (resp.data.success) {
            const { user } = resp.data;
            dispatch({
              type: LOGIN_SUCCESS,
              user,
            });
          } else {
            dispatch({
              type: LOGIN_FAILURE,
              error: resp.data.error,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: LOGIN_FAILURE,
            error,
          });
        });
    }
  };
}

// Dispatch register action, will call appropriate reducer (authReducer.js)
export function register(name, email, password, repeatPassword) {
  // TODO send welcome email
  // TODO axios request to backend
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const invalidPassword = checkPassword(password, repeatPassword);
    if (!invalidPassword) {
      axios.post('/api/register', {
        name,
        email,
        password,
      })
        .then((resp) => {
          if (resp.data.success) {
            const { user } = resp.data;
            dispatch({
              type: REGISTER_SUCCESS,
              user,
            });
          } else {
            dispatch({
              type: REGISTER_FAILURE,
              error: resp.data.error,
            });
          }
        })
        .catch(() => {
          dispatch({
            type: REGISTER_FAILURE,
            error: 'Error registering user.',
          });
        });
    } else {
      dispatch({
        type: REGISTER_FAILURE,
        error: invalidPassword,
      });
    }
  };
}

// Dispatch logout action
export function logout() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    axios.post('/api/logout')
      .then((resp) => {
        if (resp.data.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
        } else {
          dispatch({
            type: LOGOUT_FAILURE,
            error: resp.data.error,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_FAILURE,
          error: 'Error logging out.',
        });
      });
  };
}

// Dispatch sync action, ensures backend and frontend auth states are in alignment
export function sync(userId) {
  return (dispatch) => {
    dispatch({
      type: SYNC_REQUEST,
    });
    axios.get(`/api/sync/${userId}`)
      .then((resp) => {
        if (resp.data.success) {
          dispatch({
            type: SYNC_SUCCESS,
          });
        } else {
          dispatch({
            type: SYNC_FAILURE,
            error: resp.data.error,
          });
          // If states aren't synced, log user out
          axios.post('/api/logout')
            .then((res) => {
              if (res.data.success) {
                dispatch({
                  type: LOGOUT_SUCCESS,
                });
              } else {
                dispatch({
                  type: LOGOUT_FAILURE,
                  error: 'Error logging out',
                });
              }
            })
            .catch(() => {
              dispatch({
                type: LOGOUT_FAILURE,
                error: 'Error logging out',
              });
            });
        }
      })
      .catch(() => {
        dispatch({
          type: SYNC_FAILURE,
          error: 'Error syncing states',
        });
      });
  };
}

export function forgot(email) {
  return (dispatch) => {
    dispatch({
      type: SYNC_REQUEST,
    });
    axios.get(`/api/sync/${userId}`)
      .then((resp) => {
        if (resp.data.success) {
          dispatch({
            type: SYNC_SUCCESS,
          });
        } else {
          dispatch({
            type: SYNC_FAILURE,
            error: resp.data.error,
          });
          // If states aren't synced, log user out
          axios.post('/api/logout')
            .then((res) => {
              if (res.data.success) {
                dispatch({
                  type: LOGOUT_SUCCESS,
                });
              } else {
                dispatch({
                  type: LOGOUT_FAILURE,
                  error: 'Error logging out',
                });
              }
            })
            .catch(() => {
              dispatch({
                type: LOGOUT_FAILURE,
                error: 'Error logging out',
              });
            });
        }
      })
      .catch(() => {
        dispatch({
          type: SYNC_FAILURE,
          error: 'Error syncing states',
        });
      });
  };
}
