import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import Tree from './Tree.jsx';
import Navbar from './Navbar.jsx';
import Game from '../game/gameindex.jsx';


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
                <Game />
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
