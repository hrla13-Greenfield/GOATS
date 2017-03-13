import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Game from './game/gameindex.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
    };
  }

  render() {
    return(
      <div>
        <Game />
      </div>
    )
  }
}

export default App;
