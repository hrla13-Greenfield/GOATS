import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/UserActions';
import GroupList from '../components/GroupList.jsx';
import AddGroupInput from '../components/AddGroupInput.jsx';
import { Link } from 'react-router';

const io = require('socket.io-client');
const socket = io();

@connect((store) => {
  return {
    userdata: store.userdata,
  };
}) 

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.groupInput = this.groupInput.bind(this)
    this.friendInput = this.friendInput.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.changeRoom = this.changeRoom.bind(this);
  }

  componentWillMount() {
    if (!!localStorage.getItem("userToken")) {
      var tempEmail = JSON.parse(localStorage.getItem("emailcodeCred")).email.email;
      this.props.dispatch(UserActions.signIn(tempEmail));
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value})
  }
  groupInput() {
    this.setState({
      group: (<form onSubmit={() => this.addGroup()}><input onChange={this.handleChange} type="text"></input></form>)
    })
  }
  friendInput(groupID) {
    this.setState({
       [groupID] : (<form onSubmit={() => this.addFriend(groupID)}> <input placeholder='email' onChange={this.handleChange} type="text"></input></form>)
    })
  }
  inputChange(e, groupID) {
    this.this.setState({ text: e.target.value })
  }
  
  addFriend(groupID) {
    this.props.dispatch(UserActions.addFriend(groupID, this.state.value, this.props.userdata.userID, this.props.userdata.username))
  }
  addGroup() {
    this.props.dispatch(UserActions.addGroup(this.state.value, this.props.userdata.userID, this.props.userdata.username))
  }
  changeRoom(groupName) {
    this.props.dispatch(UserActions.selectRoom(groupName));
    socket.emit('init-game', {
      opponentPicture: this.props.userdata.userImg,
      opponentUsername: this.props.userdata.username,
      opponentScore: 0,
      room: groupName,
      opponentSelection: this.props.userdata.current.name, 
    })
    
  }

  logout(){
    console.log("insidelogout")
    localStorage.clear();
    location.href= "/"
    window.location.reload()

  }
  
  renderInviteNotification() {
    if (this.props.userdata.invites.length > 0) {
    return (
      <div><small><i className="material-icons">group</i> </small> New Group Invites!</div>
    )
    } else {
      return (
        <div></div>
      )
    }
  }

  renderlist() {
    const mappedGroups = this.props.userdata.currentGroupsByID.map((group, idx) => { 
    const mappedUsers = group.members.map((user, index) => (<li key={index}>{user}</li>))
    return(
      <div key={idx}>
      <h4><Link to="/game" onClick={() => this.changeRoom(group.name)}>{group.name}  <i className="fa fa-gamepad" aria-hidden="true"></i>
</Link><a onClick={() => this.friendInput(group.id)}>   <span className="glyphicon glyphicon-plus-sign"></span></a></h4>
      <div>{this.state[group.id]}</div>
      <ul>{mappedUsers}</ul>
      </div>
    )}) 
  
    return (
      <div >
        <h1 style={{'fontFamily': "Brush Script MT, cursive", 'fontSize': "72px"}}>goats</h1>
        <ul className="nav nav-pils nav-stacked">
          <li><Link to={'/tree'}>Home</Link></li>
          <li><Link to={'/browse'}>Browse All</Link></li>
          <li><Link to={'/dayplanner'}>Plan my Day</Link></li>
          <li><Link onClick={() => this.logout()}>Logout</Link></li>
      
          <li>________</li>
            <li> Welcome, {this.props.userdata.username}</li>
            <Link to="/profile"><li>View Profile</li></Link>
            <br />
            <Link to="/profile">{this.renderInviteNotification()}</Link>
            
            
          <hr />
          <h3>My Groups <a onClick={this.groupInput}> <span className="glyphicon glyphicon-plus-sign"></span></a></h3>
          <div>{this.state.group}</div>
          <div className="red">{this.props.userdata.note}</div>
          <br />
          {mappedGroups}
        </ul>
      </div>
    );
  }

  render() {
    if (this.props.userdata.isLoading) {
      return (
        <div>
        </div>
      )
    } else {
       return (
    <div>
      {this.renderlist()}
    </div>
    )
    }
  }
}

