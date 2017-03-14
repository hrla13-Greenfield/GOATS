import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index.js';
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
   <App />
  </Provider >
  , document.getElementById('app'));
