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
    socket.on('init-game', function(data) {
        if(data.room === self.state.myRoom && data.opponentUsername !== self.props.userdata.username) {
            self.setState({
                opponentPicture: [<img src={data.opponentPicture} height='50px'/>],
                opponentUsername: [data.opponentUsername],
                opponentScore: [data.opponentScore],
                room: data.room
            })
        socket.emit('init-game2', self.props.userdata)
        }
    })
    socket.on('init-game2', function(data) {
        if(data.roomSelected === self.state.myRoom && data.username !== self.props.userdata.username) {
            self.setState({
                opponentPicture: [<img src={data.userImg} height='50px'/>],
                opponentUsername:[data.username],
                opponentScore: 0,
                room: data.roomSelected
            })
        }
    })
    socket.on('count', function(data) {
        if(data.selectedRoom === self.state.myRoom) {
            self.setState({
                opponentScore: [data.score]
            })
        }
        })

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
            <div>
                <h5>{this.state.winCondition}</h5>
                <h3>PRESS: <b>{(this.state.random).toUpperCase()}</b></h3>
                <img src={this.state.img}/>
                <div>Your Score: {this.state.count}</div>
                <h6>{this.state.penalty}</h6>
                <h6>myRoom: {this.state.myRoom}</h6>
                <div>
                    <h4>Opponent Information:</h4>
                    <h6>Username: {this.state.opponentUsername}</h6>
                    <h6>Picture: {this.state.opponentPicture}</h6>
                    <h6>Room: {this.state.room}</h6>
                    <h6>Score: {this.state.opponentScore}</h6>
                </div>
            </div> 
            <button onClick={this.handleReset}>RESET</button>
        </div>
        )
    }
}

export default GameComponent;