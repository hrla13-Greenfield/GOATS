import { combineReducers } from 'redux';
// export { default as userdata } from './userdata.js';
import ChoicesReducer from './choices.jsx';
import UserReducer from './userdata.js';

const rootReducer = combineReducers({
  choices: ChoicesReducer,
  userdata: UserReducer,
});

export default rootReducer;
