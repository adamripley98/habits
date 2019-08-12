import axios from 'axios';
import {
  REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS,
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT,
} from '../types';
import { checkPassword, encryptPassword } from '../../utils/passwordUtils';

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
          const { user } = resp.data;
          console.log('user', user);
          dispatch({
            type: LOGIN_SUCCESS,
            user,
          });
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
          const { user } = resp.data;
          dispatch({
            type: REGISTER_SUCCESS,
            user,
          });
        })
        .catch((error) => {

        });
    } else {
      dispatch({
        type: REGISTER_FAILURE,
        error: invalidPassword,
      });
    }
  };
}

// Dispatch logout action, will call appropriate reducer (authReducer.js)
export function logout() {
  return {
    type: LOGOUT,
  };
}
