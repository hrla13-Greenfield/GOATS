import React from 'react';
import ReactDOM from 'react-dom';
import GameComponent from './gameassets/gamecomponent.jsx';
import { connect } from 'react-redux';

const io = require('socket.io-client');
const socket = io();

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

class GameLanding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opponentPicture: '',
      opponentUsername: '',
      opponentSelection: '',
      myRoom: this.props.userdata.roomSelected,
      room: '',
      gameReady: false,
      counter: false,
    }
    this.rdyup2 = this.rdyup2.bind(this);

    var self = this;
    socket.on('init-game', function (data) {
      if (data.room === self.state.myRoom && data.opponentUsername !== self.props.userdata.username) {
        self.setState({
          opponentPicture: <img src={data.opponentPicture} height='50px' />,
          opponentUsername: data.opponentUsername,
          opponentSelection: data.opponentSelection,
          room: data.room
        })
        socket.emit('init-game2', self.props.userdata);
      }
    })
    socket.on('init-game2', function (data) {
      if (data.roomSelected === self.state.myRoom && data.username !== self.props.userdata.username) {
        self.setState({
          opponentPicture: <img src={data.userImg} height='50px' />,
          opponentUsername: data.username,
          opponentSelection: data.current.name,
          room: data.roomSelected
        })
      }
    })
    socket.on('ready-up', function(data) {
      if(data.roomname === self.props.userdata.roomSelected) {
        self.setState({
          gameReady: true,
        })
      }
    })
  }

  rdyup() { 
    
    socket.emit('ready-up', {
      roomname: this.props.userdata.roomSelected
    })
      this.setState({
        gameReady: true,
      })
  }

  rdyup2() {
    var self = this;
    if (this.state.counter === false) {
    setTimeout(() => {
      self.setState({
      counter: true
    })
    }, 4000);
    }
  }
    render() {
      if(!!localStorage.getItem("userToken") === false){
      window.location.href= "/login"
      return false;
    } else {
      if (this.state.gameReady === true) {
        this.rdyup2();
        return (
         this.state.counter === true ? (<div><GameComponent /></div>) : (<div>Get ready</div>)
        )
      } else {
      return (
        <div>
          {this.state.opponentUsername === '' ? <div>Waiting for Opponent</div> : <div><div>Opponent Found!</div><button onClick={() => this.rdyup()}>Ready !</button></div>}
          <div>
            <h4>Opponent Information:</h4>
            <h6>Room: {this.state.myRoom}</h6>
            <h6>Picture: {this.state.opponentPicture}</h6>
            <h6>Username: {this.state.opponentUsername}</h6>
            <h6>Recommendation: {this.state.opponentSelection}</h6>
          </div>
        </div>
      )
      }
    }
  }
}

export default GameLanding;