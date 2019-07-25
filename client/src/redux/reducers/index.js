import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import authReducer from './authReducer';

// Config necessary for state persistance
const config = {
  key: 'primary',
  storage,
};

// Root reducer combines all separate reducers and calls appropriate one
const rootReducer = persistCombineReducers(config, {
  authState: authReducer,
});

export default rootReducer;
