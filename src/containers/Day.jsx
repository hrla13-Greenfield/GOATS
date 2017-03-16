import React from 'react';
import ReactDOM from 'react-dom';
import DayPlanner from './DayPlanner.jsx';
import NoPlan from './NoPlan.jsx';
import Suggestion from './Suggestion.jsx'
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

class Day extends React.Component {
  render(){
    console.log('inDay');
    return(
    <div>
      <div> 
        <DayPlanner /> 
      </div>
      <div> 
        <NoPlan /> 
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    choices: state.choices,
  };
}

export default connect(mapStateToProps)(Day);