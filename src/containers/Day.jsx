import React from 'react';
import ReactDOM from 'react-dom';
import DayPlanner from './DayPlanner.jsx';
import NoPlan from './NoPlan.jsx';
import Suggestion from './Suggestion.jsx'
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import Location from './LocationTree.jsx';

class Day extends React.Component {
  render(){
  if(!!localStorage.getItem("userToken") === false){
      window.location.href= "/login"
      return false;
    } else {

     if (this.props.choices.zipCode === false) {
      return (
        <div>
          <Location />
        </div>
      )} else {
    return (
    <div>
      <div> 
        <NoPlan /> 
      </div>
      <div> 
        <DayPlanner /> 
      </div>
    </div>
    )
  }
}
  }
}

function mapStateToProps(state) {
  return {
    choices: state.choices,
  };
}

export default connect(mapStateToProps)(Day);