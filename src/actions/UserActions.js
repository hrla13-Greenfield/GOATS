import axios from 'axios';
import * as types from '../constants/ActionTypes.jsx';

export function signInSuccess(userinfo, username) {
  console.log(userinfo, "this is userinfo")
  var userinfo = userinfo.data;
  var newGroups = [];
  var newGroupsByID = [];
  for (var i=0; i<userinfo.usergroups.length; i++) {
    if (userinfo.usergroups[i].Users.length !== 0) {
      newGroups.push(userinfo.usergroups[i].id);
     
      var membersTemp = [];
      for (var j=0; j<userinfo.usergroups[i].Users.length; j++) {
        if (userinfo.usergroups[i].Users[j].username !== username) {
          membersTemp.push(userinfo.usergroups[i].Users[j].username);
        }
      }
      var newGroupTemp = {
        id: userinfo.usergroups[i].id,
        name: userinfo.usergroups[i].name,
        members: membersTemp,
      }
      newGroupsByID.push(newGroupTemp);
    }
  }
  var newHistory = []
  for (var k=0; k<userinfo.history.length; k++) {
    var historyTemp = {
      name: userinfo.history[k].name,
      address: userinfo.history[k].address,
      category: userinfo.history[k].category,
      id: userinfo.history[k].id,
      open: userinfo.history[k].open_hours,
      phone: userinfo.history[k].phone,
      url: userinfo.history[k].url,
      rating: userinfo.history[k].user_rating,
      image: userinfo.history[k].image,
    }
    newHistory.push(historyTemp)
  }
  var newInvites = [];
  for (var l=0; l<userinfo.invites.length; l++) {
    var tmpInvite = {
      groupID: userinfo.invites[l].GroupId,
      userID: userinfo.invites[l].UserId,
      sentBy: userinfo.invites[l].sentBy,
      id: userinfo.invites[l].id,
    }
    newInvites.push(tmpInvite);
  }
  
  return {
    type: types.SIGN_IN,
    username,
    currentGroups: newGroups,
    currentGroupsByID: newGroupsByID,
    userImg: userinfo.image,
    points: userinfo.points,
    userID: userinfo.userid,
    invites: newInvites,
    history: newHistory,
  };
}

export function isLoading(bool) {
  return {
    type: types.USER_LOADING,
    isLoading: true,
  };
}

export function saveNickname(nickname){
  return{
    type: types.SAVE_NICKNAME,
    nickname,
  }
}

export function signIn(username) {
  return (dispatch) => {
    dispatch(isLoading(true));
    axios.get('/api/users', { params: {
      username
    }} )
    .then((result) => {
      console.log(result);
      dispatch(signInSuccess(result, username));
      dispatch(doneLoading());
    }) 
  };
}

export function addFriendSuccess(groupID, friendName) {
  return {
    type: types.ADD_FRIEND,
    groupID,
    friendName,
  };
}

export function doneLoading() {
  return {
    type: types.DONE_LOADING,
    status: true,
  };
}

export function addGroupSuccess(groupName) {
  return {
    type: types.ADD_GROUP,
    groupName,
  };
}

export function addFriend(groupID, friendName, userID) {
  return (dispatch) => {
    dispatch(isLoading(true));
    axios.post('/api/users/groups', { 
      groupID,
      friendName,
      userID,
    }
    ).then(() => {
      dispatch(addFriendSuccess(groupID, friendName));
      dispatch(doneLoading());
    })
    .catch((err) => {
      console.log(err)
    })
  };
}


export function addGroup(groupName, userID) {
  return (dispatch) => {
    dispatch(isLoading(true));
    dispatch(addGroupSuccess(groupName));
  };
}

