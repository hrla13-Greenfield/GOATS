import * as types from '../constants/ActionTypes.jsx';
import _ from 'lodash';

const initialState = {
  signedIn: false,
  currentGroups: [],
  currentGroupsByID: {},
  username: null,
  userImg: null,
  userID: null,
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
      };
    case types.GET_STATE:
      return {
        ...state,
      };

    case types.ADD_GROUP:
      const newId = state.currentGroups[state.currentGroups.length - 1] + 1;
      return {
        ...state,
        currentGroups: state.currentGroups.concat(newId),
        currentGroupsByID: {
          ...state.currentGroupsByID,
          [newId]: {
            id: newId,
            name: action.name,
          },
        },
      };

    case types.DELETE_GROUP:
      return {
        ...state,
        currentGroups: state.currentGroups.filter(id => id !== action.id),
        currentGroupsByID: _.omit(state.currentGroupsByID, action.id),
      };

    default:
      return state;
  }
}