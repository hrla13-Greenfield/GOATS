import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index.js';


ReactDOM.render(
  <Provider store={createStore(reducers)}>
   <App />
  </Provider>
  , document.getElementById('app'));
