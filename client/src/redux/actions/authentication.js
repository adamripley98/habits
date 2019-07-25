// Actions which will be dispatched to the reducers (authReducer.js)

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
  console.log('enters register action');
  if (password !== repeatPassword) {
    // TODO REGISTER_FAILURE
    return;
  }
  // TODO actually register
  return {
    type: 'REGISTER',
    name,
    email,
    password,
  };
}

// Dispatch logout action, will call appropriate reducer (authReducer.js)
export function logout() {
  return {
    type: 'LOGOUT',
  };
}
