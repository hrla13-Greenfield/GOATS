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
          opponentPicture: data.opponentPicture,
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
          opponentPicture: data.userImg,
          opponentUsername: data.username,
          opponentSelection: data.current.name,
          room: data.roomSelected
        })
      }
    })
    socket.on('ready-up', function (data) {
      if (data.roomname === self.props.userdata.roomSelected) {
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
      }, 3000);
    }
  }
  render() {
    if (!!localStorage.getItem("userToken") === false) {
      window.location.href = "/login"
      return false;
    } else {
      if (this.state.gameReady === true) {
        this.rdyup2();
        return (
          this.state.counter === true ? (<div className="gameholder"><GameComponent /></div>) : (<div className='getready'>Get ready</div>)
        )
      } else {
        if (this.state.opponentUsername === '') {
          return (
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              Waiting for Opponent...
            </div>
          )
        } else {
          return (
            <div>
              <div className="alert alert-success" role="alert">Opponent Found!</div>

              <div className="profileCard card">

                <img className="profilePicture card-img-top" src={this.state.opponentPicture} alt="Card image cap" />
                <div className="card-block">
                  <h4 className="card-title">{this.state.opponentUsername}</h4>
                  <p className="card-text">Room: {this.state.myRoom}</p>
                  <p className="card-text">Selection: {this.state.opponentSelection}</p>
                  <p className="card-text"><small className="text-muted"><button onClick={() => this.rdyup()}>GET READY TO RUMBLE</button></small></p>
                </div>
              </div>
            </div>
          )
        }
      }
    }
  }
}

export default GameLanding;