import React from 'react';
import ReactDOM from 'react-dom';
import GameComponent from './gameassets/gamecomponent.jsx';

class Game extends React.Component {
    constructor(props) {
      super(props) 
    }

    render() {
      // console.log(!!localStorage.getItem("userToken"), "this is in game")
      if(!!localStorage.getItem("userToken") === false){
      window.location.href= "/#/login"
      return false;
    }else{
        return(
        <div>
          <GameComponent />
        </div> 
        )
    }
    }
}

export default Game;