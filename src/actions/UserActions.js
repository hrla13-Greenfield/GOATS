import axios from 'axios';
import * as types from '../constants/ActionTypes.jsx';

//if db call is successful then repopulate redux store
export function signInSuccess(userinfo, username) {
  var userinfo = userinfo.data;
  const newGroups = [];
  const newGroupsByID = [];
  for (let i = 0; i < userinfo.usergroups.length; i += 1) {
    if (userinfo.usergroups[i].Users.length !== 0) {
      newGroups.push(userinfo.usergroups[i].id);

      const membersTemp = [];
      for (let j = 0; j < userinfo.usergroups[i].Users.length; j += 1) {
        if (userinfo.usergroups[i].Users[j].username !== username) {
          membersTemp.push(userinfo.usergroups[i].Users[j].username);
        }
      }
      const newGroupTemp = {
        id: userinfo.usergroups[i].id,
        name: userinfo.usergroups[i].name,
        members: membersTemp,
      };
      newGroupsByID.push(newGroupTemp);
    }
  }
  let newCurrent;
  const newHistory = [];
  for (let k = userinfo.history.length - 1; k >= 0; k -= 1) {
    if (userinfo.history[k].id.toString() === userinfo.current) {
      newCurrent = userinfo.history[k];
      continue;
    }
    const historyTemp = {
      name: userinfo.history[k].name,
      address: userinfo.history[k].address,
      category: userinfo.history[k].category,
      id: userinfo.history[k].id,
      open: userinfo.history[k].open_hours,
      phone: userinfo.history[k].phone,
      url: userinfo.history[k].url,
      rating: userinfo.history[k].user_rating,
      image: userinfo.history[k].image,
    };
    newHistory.push(historyTemp);
  }
  const newInvites = [];
  for (let l = 0; l < userinfo.invites.length; l += 1) {
    const tmpInvite = {
      groupID: userinfo.invites[l].GroupId,
      userID: userinfo.invites[l].UserId,
      sentBy: userinfo.invites[l].sentBy,
      id: userinfo.invites[l].id,
    };
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
    current: newCurrent,
  };
}

// do not render content on the page until isLoading is set to false
export function isLoading() {
  return {
    type: types.USER_LOADING,
    isLoading: true,
  };
}

export function saveNickname(nickname) {
  return {
    type: types.SAVE_NICKNAME,
    nickname,
  };
}

// sets a note on Navbar to user for invitations, etc
export function updateNote(text) {
  return {
    type: types.NOT_SUCCESSFUL,
    note: text,
  };
}

//remove note from navbar after setInterval
export function clearNote() {
  return {
    type: types.NOT_SUCCESSFUL,
    note: '',
  };
}

// load component when loading is complete
export function doneLoading() {
  return {
    type: types.DONE_LOADING,
    status: true,
  };
}
export function unSuccess(text) {
  return (dispatch) => {
    dispatch(updateNote(text));
    dispatch(doneLoading());
    setTimeout(() => {
      dispatch(clearNote());
    }, 7500);
  };
}


// creates database call and calls SigninSuccess if successful
export function signIn(username) {
  // dispatch is a redux term- call an action from our action handler list
  // we are using thunk- which allows us to return a function instead of simple obj
  return (dispatch) => {
    // things won't show up if isLoading is true for the store
    dispatch(isLoading(true));
    axios.get('/api/users', { params: {
      username,
    } })
    .then((result) => {
      dispatch(signInSuccess(result, username));
      dispatch(doneLoading());
    });
  };
}

export function addFriendSuccess(groupID, friendName) {
  return {
    type: types.ADD_FRIEND,
    groupID,
    friendName,
  };
}


export function addGroupSuccess(groupName) {
  return {
    type: types.ADD_GROUP,
    groupName,
  };
}

//create db call to add friend to group
export function addFriend(groupID, friendName, userID, username) {
  return (dispatch) => {
    dispatch(isLoading(true));
    axios.post('/api/users/groups', {
      groupID,
      friendName,
      userID,
    },
    ).then(() => {
      const txt = `Invite sent to ${friendName}`;
      dispatch(unSuccess(txt));
      dispatch(signIn(username));
    })
    .catch((err) => {
      dispatch(unSuccess('Invalid selection, please try again'));
      console.log(err);
    });
  };
}

// dispatch db call to add user to group
export function acceptRequest(reqid, user) {
  return (dispatch) => {
    dispatch(isLoading(true));
    axios.post('/api/users/invites', {
      reqid,
      type: 'acc',
    },
    ).then(() => {
      dispatch(signIn(user));
    })
    .catch(() => {
      dispatch(unSuccess('Invalid selection, please try again'));
    });
  };
}

// destroy pending invite request
export function declineRequest(reqid, user) {
  return (dispatch) => {
    dispatch(isLoading(true));
    axios.post('/api/users/invites', {
      reqid,
      type: 'del',
    },
    ).then(() => {
      dispatch(signIn(user));
    })
    .catch((err) => {
      dispatch(unSuccess('Invalid selection, please try again'));
      console.log(err);
    });
  };
}

// dispatch call to DB to create new usergroup
export function addGroup(groupName, userID, username) {
  return (dispatch) => {
    dispatch(isLoading(true));
    axios.post('/api/groups', {
      groupName,
      userID,
    })
    .then(() => {
      dispatch(doneLoading());
      dispatch(signIn(username));
      dispatch(unSuccess('New group created!'));
    })
    .catch(() => {
      dispatch(unSuccess('Unable to create group, please try again'));
    });
  };
}

export function selectRoom(groupName) {
  return {
    type: types.SELECT_ROOM,
    groupName,
  };
}

export function chooseRating(rating, historyid, username) {
  return (dispatch) => {
    dispatch(isLoading(true));
    axios.post('/api/users/rating', {
      rating,
      historyid,
    },
  ).then(() => {
    dispatch(signIn(username));
  })
  .catch(() => {
    dispatch(unSuccess('Invalid selection, please try again'));
  });
  };
}

export function deletehistory(historyid, username) {
  return (dispatch) => {
    dispatch(isLoading(true));
    axios.post('/api/users/deletehistory', {
      historyid,
    },
    ).then(() => {
      dispatch(signIn(username));
    })
    .catch(() => {
      dispatch(unSuccess('Invalid selection, please try again'));
    });
  };
}

export function changePic(url, userid, user) {
  return (dispatch) => {
    dispatch(isLoading(true));
    axios.post('/api/users/picture', {
      url,
      userid,
    },
    ).then(() => {
      dispatch(signIn(user));
    })
    .catch(() => {
      dispatch(unSuccess('Invalid selection, please try again'));
    });
  };
}
