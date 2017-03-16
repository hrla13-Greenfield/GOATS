import React from 'react';
import ReactDOM from 'react-dom';

const io = require('socket.io-client');
const socket = io();

socket.on('connect', function(data) {
    socket.emit('join', 'the client is live!!!')
})

class GameComponent extends React.Component {
    constructor(props) {
      super(props)
      var charArr = ['a', 's', 'd', 'f']
      var initRandom = charArr[Math.floor(charArr.length * Math.random())]
      this.state = {
        opponentScore: 0,
        count: 0,
        random: initRandom,
        winCondition: "Get to 10 points to WIN!",
        penalty: "Let's Go!",
        img: "http://opengameart.org/sites/default/files/cat_a1.gif",
        group: "Group 1"
      };
      this.handleCount = this.handleCount.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.handleRandom = this.handleRandom.bind(this);

    var self = this;
        socket.on('count', function(data) {
            alert(data);
            self.setState({
                opponentScore: data
        })
    })
    }

    handleRandom(event) {
        var charArr = ['a','s','d','f'];
        var randomChar = charArr[Math.floor(charArr.length * Math.random())];
        this.setState({
            random: randomChar
        })
        console.log('this is the random ', randomChar);
    }    

    handleCount(event) {

        event = event || window.event;
        var currCount = this.state.count;
        var charCode = event.keyCode || event.which;
        var charStr = String.fromCharCode(charCode);

        if(currCount >= 10) {
            return;
        }
        else if(charStr === this.state.random) {     
          currCount += 1;
          socket.emit('count', currCount)
          this.setState({
              penalty: "You Rock!",
              img: "http://opengameart.org/sites/default/files/cat_a1.gif"
          })
        }
        else if(charStr !== this.state.random) {
          currCount -= 1;
          socket.emit('count', currCount)
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
        <div>
            <div>{this.state.group}</div>
            <div onKeyPress={this.handleCount}>
            <div>
                <h4>{this.state.random}</h4>
                <h5>{this.state.winCondition}</h5>
                <h5>{this.state.penalty}</h5>
                <h3>{this.state.opponentScore}</h3>
                <img src={this.state.img}/>
            </div>
            <div onKeyPress={this.handleCount}>{this.state.count}</div>
            <button onClick={this.handleCount}>+</button>
            </div> 
            <button onClick={this.handleReset}>RESET</button>
        </div>
        )
    }
}

export default GameComponent;