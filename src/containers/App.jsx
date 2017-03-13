import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Tree from './Tree.jsx';
import Navbar from './Navbar.jsx';
import { createStore } from 'redux'
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
      <div className="row">
        <Provider store={store}>
          <div className="container-fluid">
            <div className="row">
              <div color="grey" className="col-sm-3 col-lg-2">
                <Navbar />
              </div>
              <div className="col-sm-9 col-lg-10">
                <Tree /> 
              </div>
            </div>
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
