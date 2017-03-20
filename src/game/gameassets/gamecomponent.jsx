import React from 'react';
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
      img: 'https://s-media-cache-ak0.pinimg.com/originals/bb/af/a7/bbafa7a2b4273e152995aaeb9ae4477a.gif',
      room: '',
      disconnect: '',
    };
    this.handleCount = this.handleCount.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleRandom = this.handleRandom.bind(this);

    const self = this;
    socket.on('count', (data) => {
      self.setState({
        opponentScore: data.score,
        opponentUsername: data.username,
        oppCurrent: data.currSuggestion,
      });
    });
    socket.on('disconnect', (data) => {
      console.log('this is from the socket disconnect on the client side')
      self.setState({
        disconnect: 'USER DISCONNECTED!'
      })
    })

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
        img: 'https://s-media-cache-ak0.pinimg.com/originals/bb/af/a7/bbafa7a2b4273e152995aaeb9ae4477a.gif',
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
        img: 'https://31.media.tumblr.com/b427bb920841552191c7cd744d81c40e/tumblr_inline_n2j4stARQt1rnyp4t.gif',
      });
    }
    if (currCount >= 10 || this.state.opponentScore === -10) {
      this.setState({
        winCondition: 'YOU WIN!',
        img: 'http://vignette2.wikia.nocookie.net/goatlings/images/6/67/8bit_Goat.gif/revision/latest?cb=20140531215233',
      });
    }
    if (currCount <= -10 || this.state.opponentScore === 10) {
      this.setState({
        winCondition: 'YOU LOSE, GIT GUD!',
        img: 'https://thirtysomethingaf.files.wordpress.com/2016/09/giphy1.gif?w=696',
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
          <div className="alert alert-dismissible alert-success">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <strong>{this.state.winCondition}</strong> <a href="#" className="alert-link" />
          </div>

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
                  <div className="centerthis">
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
          <div className="alert alert-dismissible alert-danger">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <strong>YOU LOSE! Click to view {this.state.opponentUsername}'s activity:</strong> <a href="#" className="alert-link" />
          </div>
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
                <div className="modal-body" style={{ textAlign: 'center' }}>
                  <div className="centerthis">
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
                </div>
              </div>
            </div>
          </div>

        </div>
      );
    }

    return (
    <div>
    <div className="gameCard card" onKeyPress={this.handleCount}>
                  
      <h3>PRESS: <b>{(this.state.random).toUpperCase()}</b></h3>
      <img className="card-img-top" src={this.state.img} alt="Card image cap"/>
        <div className="card-block">
          <h4 className="card-title">{this.state.winCondition}</h4>
          <p className="card-text">Your Score: {this.state.count}</p>
          <p className="card-text">Opponent's Score: {this.state.opponentScore}</p>
          <p className="card-text">{this.state.penalty === "Let's Go!" ? <span className="label label-primary">{this.state.penalty}</span> : this.state.penalty === 'You Suck!' ? <span className="label label-danger">{this.state.penalty}</span> : <span className="label label-success">{this.state.penalty}</span>}</p>
          <p className="card-text"><small className="text-muted"><button>PLAY</button></small></p>
        </div>
      </div>
      </div>
    );

    if(this.state.disconnect === 'USER DISCONNECTED!') {
      return(
        <div> 
          {this.state.disconnect}
        </div>
      )
    }  
  }
}

export default GameComponent;

