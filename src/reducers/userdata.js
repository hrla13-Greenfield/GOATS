import * as types from '../constants/ActionTypes.jsx';
import _ from 'lodash';

const initialState = {
  signedIn: false,
  currentGroups: [],
  currentGroupsByID: {},
  username: null,
  userImg: null,
  userID: null,
  currentnickname: null,
  isLoading: true,
  roomSelected: null,
  points: 0,
  invites: [],
  history: [],
  note: '',
};

export default function groups(state = initialState, action) {
  switch (action.type) {

    case types.SIGN_IN:
      return {
        ...state,
        currentGroups: action.currentGroups,
        currentGroupsByID: action.currentGroupsByID,
        signedIn: true,
        username: action.username,
        userImg: action.userImg,
        userID: action.userID,
        invites: action.invites,
        history: action.history,
        points: action.points,
      };

    case types.NOT_SUCCESSFUL:
      return {
        ...state,
        note: action.note,
      }
    case types.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case types.SELECT_ROOM:
      return {
        ...state,
        roomSelected: action.groupName,
      };

    case types.DONE_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case types.SAVE_NICKNAME:
      return {
        ...state,
        currentNickname: action.nickname,
      };



    case types.ADD_FRIEND:
      for (let i = 0; i < state.currentGroupsByID.length; i++) {
        if (state.currentGroupsByID[i].id === action.groupID) {
          var thisGroup = i;
        }
      }
      return {
        ...state,
        currentGroups: state.currentGroupsByID[thisGroup].members.push(action.friendName),
      };

    case types.ADD_GROUP:
    const newGroup = {
      name: action.groupName,
      members: [],
      id: state.currentGroupsByID.length,
    }
      return {
        ...state,
        currentGroups: state.currentGroupsByID.push(newGroup),
      };

    default:
      return state;
  }
}
