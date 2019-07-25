import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistStore } from 'redux-persist';
import store from './redux/configureStore';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import App from './App';

const persistor = persistStore(store);

persistStore(
  store,
  null,
  () => store.getState(),
);

render((
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
), document.getElementById('root'));
