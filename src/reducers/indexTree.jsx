import { combineReducers } from 'redux';
import ChoicesReducer from './choices.jsx';

const rootReducer = combineReducers({
  choices: ChoicesReducer,
});

export default rootReducer;