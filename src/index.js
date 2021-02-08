import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import createMidllewareSaga from 'redux-saga';

import authReducer from './saga-state/authreducer';

import './index.css';
import App from './App';

import { authSagaSignIn, authSagaSignUp, authSagaAddQuote, authSagaSignOut } from './saga-state/authSagaGen';


const sagaMiddleware = createMidllewareSaga();
const store = createStore(authReducer, applyMiddleware(sagaMiddleware));
ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <App />

      </BrowserRouter>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


sagaMiddleware.run(authSagaSignIn);
sagaMiddleware.run(authSagaSignOut);
sagaMiddleware.run(authSagaSignUp);
sagaMiddleware.run(authSagaAddQuote);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
