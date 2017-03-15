import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './containers/App.jsx';
import reducers from './reducers/index.js';


// const client = axios.create({
//   baseURL: 'http://localhost:8000/api',
//   responseType: 'json',
// });

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))} >
    <App />
  </Provider >
  , document.getElementById('app'));
