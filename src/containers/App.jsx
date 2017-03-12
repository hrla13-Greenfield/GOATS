import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Tree from './Tree.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //display: '',
    };
  }

  render() {
    return (
      <div>
        Hello World!
       <Tree />
      </div>
    );
  }
}

export default App;
