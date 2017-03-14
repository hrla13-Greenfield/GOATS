import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index.js';
<<<<<<< HEAD
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import thunk from 'redux-thunk';


const client = axios.create({
  baseURL: 'http://localhost:8000/api',
  responseType: 'json',
})

ReactDOM.render(
  <Provider store= { createStore(reducers, applyMiddleware(thunk))} >
=======
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import thunk from 'redux-thunk';

ReactDOM.render(
  <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
>>>>>>> prep to rebase
   <App />
  </Provider >
  , document.getElementById('app'));
