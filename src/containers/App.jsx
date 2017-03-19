import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Tree from './Tree.jsx';
import Navbar from './Navbar.jsx';
import GameLanding from '../game/gameindex.jsx';
import Profile from './Profile.jsx';
import Login from './Login/login.jsx';
import Day from './Day.jsx';
import Feed from './Feed.jsx';


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
                  <div>
                      {this.props.children}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
