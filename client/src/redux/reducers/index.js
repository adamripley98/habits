import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authReducer';
import habitReducer from './habitReducer';

// Config necessary for state persistance
const config = {
  key: 'primary',
  storage,
};

const rootReducer = persistCombineReducers(config, {
  authState: authReducer,
  habitState: habitReducer,
});

export default rootReducer;
