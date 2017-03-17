import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/UserActions';
import GroupList from '../components/GroupList.jsx';
import AddGroupInput from '../components/AddGroupInput.jsx'

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
  }

  logout(){
    console.log("insidelogout")
    localStorage.clear();
    location.href= "/#/"
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
      <h4><a href="#/game" onClick={() => this.changeRoom(group.name)}>{group.name}</a><a onClick={() => this.friendInput(group.id)}>   <span className="glyphicon glyphicon-plus-sign"></span></a></h4>
      <div>{this.state[group.id]}</div>
      <ul>{mappedUsers}</ul>
      </div>
    )}) 
  
    return (
      <div >
        <h1>Navbar goes here</h1>
        <ul className="nav nav-pils nav-stacked">
          <a href="#/tree"><li>Home</li></a>
          <a href="#/browse"><li>browse all</li></a>
          <a href="#/dayplanner"><li>plan my day</li></a>
          <a onClick={() => this.logout()}>Logout</a>
      
          <li>________</li>
            <li> Welcome, {this.props.userdata.username}</li>
            <a href="#/profile"><li>View Profile</li></a>
            <br />
            <a href="#/profile">{this.renderInviteNotification()}</a>
            
            
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

