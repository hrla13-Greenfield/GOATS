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
  }

  groupInput() {
    this.setState({
      group: (<input type="text"></input>)
    })
  }
  friendInput(groupID) {
    this.setState({
       [groupID] : (<input type="text"></input>)
    })
  }

  
  renderlist() {
    const mappedGroups = this.props.userdata.currentGroupsByID.map(group => {
    const mappedUsers = group.members.map(user => (<li>{user}</li>))
    return(
      <div>
      <h4>{group.name}<a onClick={() => this.friendInput(group.name)}>   <span className="glyphicon glyphicon-plus-sign"></span></a></h4>
      <div>{this.state[group.name]}</div>
      <ul>{mappedUsers}</ul>
      </div>
    )}) 

    return (
      <div >
        <h1>Navbar goes here</h1>
        <ul className="nav nav-pils nav-stacked">
          <a href="#/tree"><li>Home</li></a>
          <a href="#"><li>browse all</li></a>
          <a href="#"><li>plan my day</li></a>
          <a href="#/game"><li>Game</li></a>
          <li>________</li>
            <li> Welcome, {this.props.userdata.username}</li>
            <a href="#/profile"><li>View Profile</li></a>
            
          <hr />
          <h3>My Groups <a onClick={this.groupInput}> <span className="glyphicon glyphicon-plus-sign"></span></a></h3>
          <div>{this.state.group}</div>
          <br />
          {mappedGroups}
        </ul>
      </div>
    );
  }

  render() {
    let self = this;
    var tmp = function() {
      self.props.dispatch(UserActions.signIn());
    }
    if (this.props.userdata.signedIn) {
    return (
    <div>
      {this.renderlist()}
    </div>
    )
    } else {
      return (
        <div>
        <h1>Sign in</h1>
        <button onClick={tmp}>Sign in</button>
        </div>
      )
    }  

  }
}

