import React from 'react';
import { Router, Route } from 'react-router';
import Tree from './Tree.jsx';
import Navbar from './Navbar.jsx';
import GameLanding from '../game/gameindex.jsx';
import Profile from './Profile.jsx';
import Login from './Login/login.jsx';
import Day from './Day.jsx';
import Feed from './Feed.jsx';


const createHistory = require('history').createHashHistory;

const hashHistory = createHistory();
// const location = history.location;

// const unlisten = history.listen((location, action) => {
  // console.log(action, location.pathname, location.state)
// })


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // if(!!localStorage.getItem("userToken")){
    //   console.log("inside true")
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
                      <Route exact path="/" component={Login} />
                      <Route path="/login" component={Login} />
                      <Route path="/game" component={GameLanding} />
                      <Route path="/tree" component={Tree} />
                      <Route path="/profile" component={Profile} />
                      <Route path="/dayplanner" component={Day} />
                      <Route path="/browse" component={Feed} />
                    </div>
                  </Router>
                </div>
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  // } else {
  //   console.log("inside false")
  // return(
  //   <div> <Navbar /></div>
  // )
  // }
} 
}

export default App;
