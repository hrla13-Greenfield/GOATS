import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as UserActions from '../actions/UserActions';

const io = require('socket.io-client');
const socket = io();

//Connect to redux store to access userdata
@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.groupInput = this.groupInput.bind(this);
    this.friendInput = this.friendInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeRoom = this.changeRoom.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('userToken')) {
      const tempEmail = JSON.parse(localStorage.getItem('emailcodeCred')).email.email;
      this.props.dispatch(UserActions.signIn(tempEmail));
    }
  }

  handleChange(e) {
    //Updates state with the contents of textbox
    this.setState({ value: e.target.value });
  }
  groupInput() {
    // render input field next to Groups dropdown to allow new group creation
    this.setState({
      group: (<form onSubmit={() => this.addGroup()}>
        <input onChange={this.handleChange} type="text" /></form>),
    });
  }

  //renders textbox inside of groups dropdown to allow end user to invite another user to group
  friendInput(groupID) {
    this.setState({
      [groupID]: (<form onSubmit={() => this.addFriend(groupID)}>
        <input placeholder="email" onChange={this.handleChange} type="text" /></form>),
    });
  }
  inputChange(e) {
    this.this.setState({ text: e.target.value });
  }
  
  //dispatch a function to invite a new user to a group
  addFriend(groupID) {
    this.props.dispatch(
      UserActions.addFriend(
        groupID,
        this.state.value,
        this.props.userdata.userID,
        this.props.userdata.username,
      ),
      );
  }

  //dispatch a function to create a new group
  addGroup() {
    this.props.dispatch(UserActions.addGroup(
      this.state.value, this.props.userdata.userID, this.props.userdata.username,
      ));
  }

  //Sets store with group name clicked to set room for game functionality
  //redirects user to game window when clicked and emits a socket event to the server 
  changeRoom(groupName) {
    this.props.dispatch(UserActions.selectRoom(groupName));
    socket.emit('init-game', {
      opponentPicture: this.props.userdata.userImg,
      opponentUsername: this.props.userdata.username,
      opponentScore: 0,
      room: groupName,
      opponentSelection: this.props.userdata.current.name,
    });
  }

// logout button
//this will clear the localStorage & destroy the token
// will redirect you to login page & refresh
  logout() {
    localStorage.clear();
    location.href = '/';
    window.location.reload();
  }

  //when pendinginvites > 0 then render a notification on the navbar
  renderInviteNotification() {
    if (this.props.userdata.invites.length > 0) {
      return (
        <div><small><i className="material-icons">group</i> </small> New Group Invites!</div>
      );
    }
    return (
      <div />
    );
  }

  
  render() {
    //Keeps page from loading until the store has been populated
    if (this.props.userdata.isLoading) {
      return (
        <div />
      );
    }
    const mappedGroups = this.props.userdata.currentGroupsByID.map((group, idx) => {
      const mappedUsers = group.members.map((user, index) => (<li key={index}>{user}</li>));
      return (
        <div className="col-md-12" key={idx}>
          <h4><Link to="/game" onClick={() => this.changeRoom(group.name)}>{group.name}<span> &nbsp;&nbsp; </span>
            <i className="fa fa-gamepad" aria-hidden="true" /> 
          </Link> <span> &nbsp; &nbsp;&nbsp;</span>
            <span
              onClick={() => this.friendInput(group.id)}
              className="glyphicon glyphicon-plus-sign"
            />
          </h4>
          <div>{this.state[group.id]}</div>
          <ul>{mappedUsers}</ul>
          <li className="divider" />
        </div>
      );
    });

    //logout button is here- logout function called on click
    //Navbar created through bootstrap
    return (
      <nav className="navbar navbar-light navbar-collapse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a onClick={() => window.location.href = '/tree'} className="navbar-brand">
              <img alt="Logo" height="50px" src="./assets/goatslogosmall.png" />
            </a>
          </div>
          <br />
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="navifont orange">
                <Link to="/profile">Hey, {this.props.userdata.username}!{this.renderInviteNotification()}
                </Link></li>
              <li className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle navifont"
                  data-toggle="dropdown"
                  role="button"
                  aria-expanded="false"
                >My Groups
                  <span className="caret" /></a>
                <ul className="dropdown-menu" role="menu">
                  <form>
                    {mappedGroups}
                  </form>
                </ul>
              </li>
              <li><a onClick={this.groupInput}>
                <span className="glyphicon glyphicon-plus-sign" />
              </a></li>
              <li><a>{this.state.group}</a></li>
              <li><a><div className="red">{this.props.userdata.note}</div></a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="navifont"><Link to={'/tree'}>Home</Link></li>
              <li className="navifont"><Link to={'/browse'}>Browse All</Link></li>
              <li className="navifont"><Link to={'/dayplanner'}>Plan my Day</Link></li>
              <li className="navifont"><Link onClick={() => this.logout()}>Logout</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

