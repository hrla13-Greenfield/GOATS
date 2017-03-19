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
    super(props);
    const charArr = ['a', 's', 'd', 'f'];
    const initRandom = charArr[Math.floor(charArr.length * Math.random())];
    this.state = {
      count: 0,
      opponentScore: 0,
      random: initRandom,
      winCondition: 'Get to 10 points to WIN!',
      penalty: "Let's Go!",
      img: 'http://opengameart.org/sites/default/files/cat_a1.gif',
      room: '',
    };
    this.handleCount = this.handleCount.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleRandom = this.handleRandom.bind(this);

    const self = this;
    socket.on('count', (data) => {
      console.log('this is the count for the data', data.score);
            // if(data.selectedRoom === self.state.myRoom) {
      self.setState({
        opponentScore: data.score,
        opponentUsername: data.username,
        oppCurrent: data.currSuggestion,
      });
            // }
    });
  }

  componentDidMount() {
    setInterval(this.handleRandom, 900);
  }

  handleRandom(event) {
    const charArr = ['a', 's', 'd', 'f'];
    const randomChar = charArr[Math.floor(charArr.length * Math.random())];
    this.setState({
      random: randomChar,
    });
  }

  handleCount(event) {
    console.log('in handle count');
    console.log('opp:', this.state.opponentScore);
    event = event || window.event;
    let currCount = this.state.count;
    const charCode = event.keyCode || event.which;
    const charStr = String.fromCharCode(charCode);

    if (currCount >= 10) {
      return;
    }
    if (currCount <= -10) {
      return;
    }
    if (charStr === this.state.random) {
      currCount += 1;
      socket.emit('count', {
        username: this.props.userdata.username,
        userPic: this.props.userdata.userImg,
        selectedRoom: this.props.userdata.roomSelected,
        currSuggestion: this.props.userdata.current,
        score: currCount,
      });
      this.setState({
        penalty: 'You Rock!',
        img: 'http://opengameart.org/sites/default/files/cat_a5.gif',
      });
    }
    if (charStr !== this.state.random) {
      currCount -= 1;
      socket.emit('count', {
        username: this.props.userdata.username,
        userPic: this.props.userdata.userImg,
        selectedRoom: this.props.userdata.roomSelected,
        currSuggestion: this.props.userdata.current,
        score: currCount,
      });
      this.setState({
        penalty: 'You Suck!',
        img: 'http://opengameart.org/sites/default/files/cat_spin_kick.gif',
      });
    }
    if (currCount >= 10 || this.state.opponentScore === -10) {
      this.setState({
        winCondition: 'YOU WIN!',
        img: 'http://opengameart.org/sites/default/files/cat_a1_super.gif',
      });
    }
    if (currCount <= -10 || this.state.opponentScore === 10) {
      console.log('loseeeeeee');
      this.setState({
        winCondition: 'LOSE',
        img: 'http://opengameart.org/sites/default/files/mon1_walk.gif',
      });
    }
    this.setState({
      count: currCount,
    });
    this.handleRandom();
  }

  handleReset() {
    let maxCount = this.state.count;
    maxCount = 0;
    this.setState({
      count: maxCount,
      winCondition: "Let's go again!",
    });
  }


  render() {
    if (this.state.winCondition === 'YOU WIN!') {
      const tmpHistory = JSON.parse(this.props.userdata.current.address);
      const cat = JSON.parse(this.props.userdata.current.category);
      var tmpCategory = [];
      if (cat) {
        cat.forEach((element) => {
          tmpCategory.push(element.title);
        });
        tmpCategory = tmpCategory.join(', ');
      }
      return (
        <div>
          <div>{this.state.winCondition}</div>

          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        View Activity Details
              </button>

          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">{this.props.userdata.current.name}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div style={{ width: '250px', height: '250px', overflow: 'hidden', textAlign: 'center' }}>
                    <a href={this.props.userdata.current.url}>
                      <img style={{ display: 'block', textAlign: 'center', margin: 'auto' }} height="250px" src={this.props.userdata.current.image} />
                    </a></div>
                  <h3>{this.props.userdata.current.name}</h3><br />
                  {tmpCategory}<br />
                 {tmpHistory.display_address[0]}<br />{tmpHistory.display_address[1]}<br />
                  {this.props.userdata.current.phone}<br />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
    } else if (this.state.opponentScore >= 10) {
      const tmpHistory = JSON.parse(this.state.oppCurrent.address);
      const cat = JSON.parse(this.state.oppCurrent.category);
      var tmpCategory = [];
      if (cat) {
        cat.forEach((element) => {
          tmpCategory.push(element.title);
        });
        tmpCategory = tmpCategory.join(', ');
      }

      return (
        <div>
                    You lose! Click to view {this.state.opponentUsername}'s activity:
                <br />
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        View Activity Details
              </button>

          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">{this.state.oppCurrent.name}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div style={{ width: '250px', height: '250px', overflow: 'hidden', textAlign: 'center' }}>
                    <a href={this.state.oppCurrent.url}>
                      <img style={{ display: 'block', textAlign: 'center', margin: 'auto' }} height="250px" src={this.state.oppCurrent.image} />
                    </a></div>
                  <h3>{this.state.oppCurrent.name}</h3><br />
                  {tmpCategory}<br />
                 {tmpHistory.display_address[0]}<br />{tmpHistory.display_address[1]}<br />
                  {this.state.oppCurrent.phone}<br />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
    }

    return (
      <div onKeyPress={this.handleCount}>
        <div>{this.state.group}</div>
        <div>
          <h5>{this.state.winCondition}</h5>
          <h3>PRESS: <b>{(this.state.random).toUpperCase()}</b></h3>
          <img src={this.state.img} />
          <div>Your Score: {this.state.count}</div>
          <div>Opponent's Score: {this.state.opponentScore}</div>
          <h6>{this.state.penalty}</h6>
        </div>
        <button onClick={this.handleReset}>RESET</button>
      </div>
    );
  }
}

export default GameComponent;
