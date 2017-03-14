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
  
  renderlist() {
    // console.log()
    const mappedGroups = this.props.userdata.currentGroupsByID.map(group => {
    const mappedUsers = group.members.map(user => (<li>{user}</li>))
    return(
      <div>
      <h3>{group.name}</h3>
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
          <a href="#"><li>________</li></a>
            <a href="#/profile"><li>View Profile</li></a>
            
          
          My Groups
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

