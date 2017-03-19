import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import thunk from 'redux-thunk';
import App from './containers/App.jsx';
import reducers from './reducers/index.js';
import Tree from './containers/Tree.jsx';
import GameLanding from './game/gameindex.jsx';
import Profile from './containers/Profile.jsx';
import Login from './containers/Login/login.jsx';
import Day from './containers/Day.jsx';
import Feed from './containers/Feed.jsx';

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))} >
    <Router history={browserHistory}>
        <Route path={'/'} component={App}>
          <IndexRoute component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/game" component={GameLanding} />
          <Route path="/tree" component={Tree} />
          <Route path="/profile" component={Profile} />
          <Route path="/dayplanner" component={Day} />
          <Route path="/browse" component={Feed} />
        </Route>
      </Router>
  </Provider >
  , document.getElementById('app'));
