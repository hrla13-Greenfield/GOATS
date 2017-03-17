import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const io = require('socket.io-client');
const socket = io();

@connect((store) => {
  return {
    userdata: store.userdata,
  };
}) 

class GameComponent extends React.Component {
    constructor(props) {
      super(props)
      var charArr = ['a', 's', 'd', 'f']
      var initRandom = charArr[Math.floor(charArr.length * Math.random())]
      this.state = {
        count: 0,
        opponentPicture: [],
        opponentUsername: [],
        opponentScore: [],
        random: initRandom,
        winCondition: "Get to 10 points to WIN!",
        penalty: "Let's Go!",
        img: "http://opengameart.org/sites/default/files/cat_a1.gif",
        myRoom: this.props.userdata.roomSelected,
        room: "" 
      };
      this.handleCount = this.handleCount.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.handleRandom = this.handleRandom.bind(this);

    var self = this;
    socket.on('count', function(data) {
        console.log('this is the data ', data)
        if(data.selectedRoom === self.state.myRoom) {
            self.setState({
                opponentPicture: [<img src={data.userPic} height='50px'/>],
                opponentUsername: [data.username],
                opponentScore: [data.score],
                room: data.selectedRoom
            })
        }
    })
    }

    componentDidMount() {
        setInterval(this.handleRandom, 900)
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
          socket.emit('count', {
              username: this.props.userdata.username,
              userPic: this.props.userdata.userImg,
              selectedRoom: this.props.userdata.roomSelected,
              currSuggestion: "TBD",
              score: currCount})
          this.setState({
              penalty: "You Rock!",
              img: "http://opengameart.org/sites/default/files/cat_a5.gif"
          })
        }
        if(charStr !== this.state.random) {
          currCount -= 1;
          socket.emit('count', {
              username: this.props.userdata.username,
              userPic: this.props.userdata.userImg,
              selectedRoom: this.props.userdata.roomSelected,
              currSuggestion: "TBD",
              score: currCount})
          this.setState({
              penalty: "You Suck!",
              img: "http://opengameart.org/sites/default/files/cat_spin_kick.gif"
          })
        }
        if(currCount >= 10) {
          this.setState({
              winCondition: "YOU WIN!",
              img: "http://opengameart.org/sites/default/files/cat_a1_super.gif"
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
            {console.log("objects", this.props.userdata)}
            <div>
                <h5>{this.state.winCondition}</h5>
                <h3>PRESS: <b>{(this.state.random).toUpperCase()}</b></h3>
                <img src={this.state.img}/>
                <div>Your Score: {this.state.count}</div>
                <h6>{this.state.penalty}</h6>
                <h6>myRoom: {this.state.myRoom}</h6>
                <h6>Room: {this.state.room}</h6>
                <h6>Opponent Picture: {this.state.opponentPicture}</h6>
                <h6>Opponent Username: {this.state.opponentUsername}</h6>
                <h6>Opponent Score: {this.state.opponentScore}</h6>
            </div> 
            <button onClick={this.handleReset}>RESET</button>
        </div>
        )
    }
}

export default GameComponent;