import React from 'react';
import ReactDOM from 'react-dom';
import GameComponent from './gameassets/gamecomponent.jsx';
import { connect } from 'react-redux';

// to use socket.io you will need this
const io = require('socket.io-client');
const socket = io();

// redux store
@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

// Stateful component to initialize the game, NOT the actual game, but a page identifying an opponent
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

    // socket.on events in the front end
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

    // Reason for init-game2 is to not have an inifinite loop of socket.on('init-game')
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

    // requires socket implementation
    socket.on('ready-up', function (data) {
      if (data.roomname === self.props.userdata.roomSelected) {
        self.setState({
          gameReady: true,
        })
      }
    })
  }

  // used to initialize the Get-Ready page
  rdyup() {
    socket.emit('ready-up', {
      roomname: this.props.userdata.roomSelected
    })
    this.setState({
      gameReady: true,
    })
  }

  // used to time out Get-Ready page and start the game after setTimeout finishes
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
    // double check a token in local storage, if you dont it will redirect you to login page
    if (!!localStorage.getItem("userToken") === false) {
      window.location.href = "/login"
      return false;
    } else {
      // rendering Get-Ready page
      if (this.state.gameReady === true) {
        this.rdyup2();
        return (
          this.state.counter === true ? (<div className="gameholder"><GameComponent /></div>) : (<div className='getready'>Get ready</div>)
        )
      } else {
        // Notification for waiting for opponent (using bootswatch and bootstrap)
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
            // rendering for the rest of the component: Opponent Found and the profile card of the opponent with their information
            <div>
              <div className="alert alert-success" role="alert">Opponent Found!</div>

              <div className="profileCard card">

                <img className="profilePicture card-img-top" src={this.state.opponentPicture} alt="Card image cap" />
                <div className="card-block">
                  <h4 className="card-title">{this.state.opponentUsername}</h4>
                  <p className="card-text">Room: {this.state.myRoom}</p>
                  <p className="card-text">Selection: {this.state.opponentSelection}</p>
                  {/*{// required to initialize game... Get-Ready page} */}
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