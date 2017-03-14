import * as types from '../constants/ActionTypes.jsx';

export function signInSuccess() {
  return {
    type: types.SIGN_IN,
    username: 'Brandon',
    currentGroups: [1, 2, 3],
    currentGroupsByID: [
      {
        id: 1,
        name: 'Group1',
        members: ['Sandra', 'Alex', 'Emily'],
      },
      {
        id: 2,
        name: 'Group2',
        members: ['Andrew', 'Regina', 'Armen'],
      },
      {
        id: 3,
        name: 'Group3',
        members: ['Josh', 'Zach', 'Marcie'],
      },
    ],
    userImg: null,
    userID: 12,
  };
}

export function isLoading(bool) {
  return {
    type: types.USER_LOADING,
    bool,
  };
}

export function signIn() {
  return (dispatch) => {
    dispatch(isLoading(true));

    //fetch
      //then
      // onsuccess -> 
    dispatch(signInSuccess());
  };
}

export function addGroup(name) {
  return {
    type: types.ADD_GROUP,
    name,
  };
}

