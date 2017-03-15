import React from 'react';
import { Router, Route } from 'react-router';
import Tree from './Tree.jsx';
import Navbar from './Navbar.jsx';
import Game from '../game/gameindex.jsx';
import Profile from './Profile.jsx';
import Login from './Login/login.jsx';

const createHistory = require('history').createHashHistory;

const hashHistory = createHistory();


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="container-fluid">
            <div className="row">
              <div color="grey" className="col-sm-3 col-lg-2">
                <Navbar />
              </div>
              <div className="col-sm-9 col-lg-10">
                <div>
                  <Router history={hashHistory}>
                    <div>
                      <Route path="/login" component={Login} />
                      <Route path="/game" component={Game} />
                      <Route path="/tree" component={Tree} />
                      <Route path="/profile" component={Profile} />
                    </div>
                  </Router>
                </div>
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
