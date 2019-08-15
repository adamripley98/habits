import axios from 'axios';
import {
  REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS,
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS,
  SYNC_FAILURE, SYNC_REQUEST, SYNC_SUCCESS,
  FORGOT_FAILURE, FORGOT_REQUEST, FORGOT_SUCCESS,
  RESET_FAILURE, RESET_REQUEST, RESET_SUCCESS,
  LOAD_RESET_REQUEST, LOAD_RESET_FAILURE, LOAD_RESET_SUCCESS,
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
      type: FORGOT_REQUEST,
    });
    if (email) {
      axios.post('/api/forgot', {
        email,
      })
        .then((resp) => {
          if (resp.data.success) {
            dispatch({
              type: FORGOT_SUCCESS,
            });
          } else {
            dispatch({
              type: FORGOT_FAILURE,
              error: resp.data.error,
            });
          }
        })
        .catch(() => {
          dispatch({
            type: FORGOT_FAILURE,
            error: 'Error changing password',
          });
        });
    } else {
      dispatch({
        type: FORGOT_FAILURE,
        error: 'Error changing password',
      });
    }
  };
}

export function reset(password, passwordConfirm, token) {
  return (dispatch) => {
    dispatch({
      type: RESET_REQUEST,
    });
    const invalidPassword = checkPassword(password, passwordConfirm);
    if (!invalidPassword) {
      axios.post('/api/reset', {
        token,
        password,
      })
        .then((resp) => {
          if (resp.data.success) {
            dispatch({
              type: RESET_SUCCESS,
            });
          } else {
            dispatch({
              type: RESET_FAILURE,
              error: resp.data.error,
            });
          }
        })
        .catch(() => {
          dispatch({
            type: RESET_FAILURE,
            error: 'Error resetting password.',
          });
        });
    }
    dispatch({
      type: RESET_FAILURE,
      error: invalidPassword,
    });
  };
}

export function loadReset(token) {
  return (dispatch) => {
    dispatch({
      type: LOAD_RESET_REQUEST,
    });
    axios.get(`/api/reset/${token}`)
      .then((resp) => {
        if (resp.data.success) {

        } else {

        }
      })
      .catch(() => {

      });
  };
}
