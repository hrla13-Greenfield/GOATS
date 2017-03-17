import React from 'react';
import ReactDOM from 'react-dom';

const io = require('socket.io-client');
const socket = io();

class GameComponent extends React.Component {
    constructor(props) {
      super(props)
      var charArr = ['a', 's', 'd', 'f']
      var initRandom = charArr[Math.floor(charArr.length * Math.random())]
      this.state = {
        count: 0,
        opponentScores: [],
        random: initRandom,
        winCondition: "Get to 10 points to WIN!",
        penalty: "Let's Go!",
        img: "http://opengameart.org/sites/default/files/cat_a1.gif",
        room: "" // identify which room the user is playing in 
      };
      this.handleCount = this.handleCount.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.handleRandom = this.handleRandom.bind(this);

    var self = this;
    socket.on('count', function(data) {
        console.log('this is the data ', data)
        self.setState({
            opponentScore: data
        })
    })
    }

    componentDidMount() {
        setInterval(this.handleRandom, 900)
        socket.emit('new-user', "test")
    }

    componentWillMount() {
        var self = this;
        socket.emit('count', function(count) {
            self.setState({
                opponentScores: [...count]
            })
        })
    }

    handleRandom(event) {
        var charArr = ['a','s','d','f'];
        var randomChar = charArr[Math.floor(charArr.length * Math.random())];
        this.setState({
            random: randomChar
        })
    }    

    handleCount(event) {

        event = event || window.event;
        var currCount = this.state.count;
        var charCode = event.keyCode || event.which;
        var charStr = String.fromCharCode(charCode);

        if(currCount >= 10) {
            return;
        }
        if(currCount <= -10) {
            return;
        }
        if(charStr === this.state.random) {     
          currCount += 1;
          socket.emit('count', {userScore: currCount})
          this.setState({
              penalty: "You Rock!",
              img: "http://opengameart.org/sites/default/files/cat_a5.gif"
          })
        }
        if(charStr !== this.state.random) {
          currCount -= 1;
          socket.emit('count', {userScore: currCount})
          this.setState({
              penalty: "You Suck!",
              img: "http://opengameart.org/sites/default/files/cat_spin_kick.gif"
          })
        }
        if(currCount >= 10) {
          this.setState({
              winCondition: "YOU WIN!",
              img: "http://opengameart.org/sites/default/files/cat_a4.gif"
          })
        }
        if(currCount <= -10) {
          this.setState({
              winCondition: "YOU LOSE! GIT GUD!",
              img: "http://opengameart.org/sites/default/files/mon1_walk.gif"
          })
        }
        this.setState({
            count: currCount
        });
        this.handleRandom();

    }

    handleReset() {
        var maxCount = this.state.count;
            maxCount = 0;
        this.setState({
            count: maxCount,
            winCondition: "Let's go again!"
        });
    }

    render() {
        return(
        <div onKeyPress={this.handleCount}>
            <div>{this.state.group}</div>
            <div>
                <h5>{this.state.winCondition}</h5>
                <h3>PRESS: <b>{(this.state.random).toUpperCase()}</b></h3>
                <img src={this.state.img}/>
                <h5>Opponent Score: {this.state.opponentScore}</h5>
                <div>Your Score: {this.state.count}</div>
                <h5>{this.state.penalty}</h5>
            </div> 
            <button onClick={this.handleReset}>RESET</button>
        </div>
        )
    }
}

export default GameComponent;