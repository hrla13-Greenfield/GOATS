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

  acceptRequest(reqid, user) {
    this.props.dispatch(UserActions.acceptRequest(reqid, user))
  }
  declineRequest(reqid, user) {
    this.props.dispatch(UserActions.declineRequest(reqid, user));
  }

  render() {
    if(!!localStorage.getItem("userToken") === false){
      window.location.href= "/#/login"
      return false;
    }else{
    const mappedInvites = this.props.userdata.invites.map(invite => {
      return(
        <tr>
          <td>{invite.groupID}</td>
          <td>{invite.sentBy}</td>
          <td><a onClick={() => this.acceptRequest(invite.id, this.props.userdata.username)}><span className="glyphicon glyphicon-ok green"></span></a></td>
          <td><a onClick={() => this.declineRequest(invite.id, this.props.userdata.username)}><span className="glyphicon glyphicon-remove red"></span></a></td>
        </tr>
      )
    })
    return (
      <div>
        <h1>{this.props.userdata.username}'s Profile</h1>
         <div className="row">
          <div className="col-md-5"><img height="125px" width="125px" src={this.props.userdata.userImg}></img></div>
         <div className="col-md-7"><h2>Pending group invites</h2>
         <table className="table">
           <thead>
           <tr>
             <th>Invited to group:</th>
             <th>Invited by: </th>
             <th>Accept: </th>
             <th>Decline: </th>
           </tr>
           </thead>
           <tbody>
           {mappedInvites}
           </tbody>
           </table>
         </div>
        </div>
        <div className="row">
         <h3> User history list </h3>
          </div>
      </div>
    );
  }
  }
}
