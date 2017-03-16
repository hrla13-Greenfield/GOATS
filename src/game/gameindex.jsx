import React from 'react';
import ReactDOM from 'react-dom';
import GameComponent from './gameassets/gamecomponent.jsx';

class Game extends React.Component {
    constructor(props) {
      super(props) 
      this.state = {
      };
    }

    render() {
        return(
        <div>
          <GameComponent />
        </div> 
        )
    }
}

export default Game;