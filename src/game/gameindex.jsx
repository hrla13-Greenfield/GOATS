import React from 'react';
import ReactDOM from 'react-dom';
import Button from './gameassets/buttons.jsx';

class Game extends React.Component {
    constructor(props) {
      super(props) 
      this.state = {
      };
    }

    render() {
        return(
        <div>
          <Button />
        </div> 
        )
    }
}

export default Game;