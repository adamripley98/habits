import axios from 'axios';
import { REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS } from '../types';
import { checkPassword, encryptPassword } from '../../utils/passwordUtils';

// Dispatch login action, will call appropriate reducer (authReducer.js)
export function login(userId, userType, name, location, profilePicture) {
  return {
    type: 'LOGIN',
    userId,
    userType,
    name,
    location,
    profilePicture,
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
      const encryptedPassword = encryptPassword(password);
      axios.post('/api/register', {
        name,
        email,
        encryptedPassword,
      })
        .then((resp) => {

        })
        .catch((error) => {

        });
      dispatch({
        type: REGISTER_SUCCESS,
        name,
        email,
        password,
        success: 'Registered!',
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
    type: 'LOGOUT',
  };
}
