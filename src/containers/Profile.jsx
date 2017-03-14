import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/UserActions';
import GroupList from '../components/GroupList.jsx';
import AddGroupInput from '../components/AddGroupInput.jsx';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class Profile extends React.Component {
  render() {
    console.log(this.props.userdata.username);
    return (
      <div>
        <h1>{this.props.userdata.username}'s Profile</h1>
         <div className="row">
          <div className="col-md-5"><img height="125px" width="125px" src=""></img></div>
         <div className="col-md-7"><h2>Pending group invites</h2></div>
        </div>
        <div className="row">
         <h3> User history list </h3>
          </div>
      </div>
    );
  }
}
