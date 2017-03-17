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
  constructor(props) {
    super(props)
    this.state = {}
    this.renderPicInput = this.renderPicInput.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.changePic = this.changePic.bind(this);
  }
  
  acceptRequest(reqid, user) {
    this.props.dispatch(UserActions.acceptRequest(reqid, user))
  }
  declineRequest(reqid, user) {
    this.props.dispatch(UserActions.declineRequest(reqid, user));
  }

  changePic() {
    this.props.dispatch(UserActions.changePic(this.state.value, this.props.userdata.userID, this.props.userdata.username))
  }
  handleChange(e) {
    this.setState({ value: e.target.value})
  }
  renderPicInput() {
    this.setState({
      picInput: (<div>New image URL:<form onSubmit={() => this.changePic()}><input onChange={this.handleChange} type="text"></input></form></div>)
    })
  }

  render() {
    if(!!localStorage.getItem("userToken") === false){
      window.location.href= "/#/login"
      return false;
    }else{
    const mappedInvites = this.props.userdata.invites.map((invite, idx) => {
      return(
        <tr key={idx}>
          <td>{invite.groupID}</td>
          <td>{invite.sentBy}</td>
          <td><a onClick={() => this.acceptRequest(invite.id, this.props.userdata.username)}><span className="glyphicon glyphicon-ok green"></span></a></td>
          <td><a onClick={() => this.declineRequest(invite.id, this.props.userdata.username)}><span className="glyphicon glyphicon-remove red"></span></a></td>
        </tr>
      )
    })
    const mappedHistory = this.props.userdata.history.map((historyitem, index) => {
      var tmpHistory = JSON.parse(historyitem.address);
      var cat = JSON.parse(historyitem.category)
      var tmpCategory = [];
      cat.forEach(function(element) {
        tmpCategory.push(element.title)
      })
      tmpCategory = tmpCategory.join(', ');
      return(
        <tr key={index}>
          <td><a href={historyitem.url}><img height="150" src={historyitem.image}></img></a></td>
          <td>{historyitem.name}</td>
          <td>{tmpHistory.display_address[0]}<br />{tmpHistory.display_address[1]}</td>
          <td>{historyitem.phone}</td>
          <td>{tmpCategory}</td>
          <td>{historyitem.rating}</td>
        </tr>
      )
    })
    return (
      <div className="col-md-12">
        <h1>{this.props.userdata.username}<small> | Profile</small></h1>
         <div className="row">
          <div className="col-md-5"><br /><img height="125px" width="125px" src={this.props.userdata.userImg}></img>
          <br /><a onClick={() => this.renderPicInput()}><small>Change</small></a>
          <br />{this.state.picInput}</div>
         <div className="col-md-7"><h3>Pending group invites</h3>
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
          <br />  <br />
         <h3> User history list </h3>
                  <table className="table">
           <thead>
           <tr>
             <th></th>
             <th>Name: </th>
             <th>Address: </th>
             <th>Phone: </th>
             <th>Category: </th>
           </tr>
           </thead>
           <tbody>
           {mappedHistory}
           </tbody>
           </table>
          </div>
      </div>
    );
  }
  }
}
