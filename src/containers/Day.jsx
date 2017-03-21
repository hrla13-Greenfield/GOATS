import React from 'react';
import { connect } from 'react-redux';
import DayPlanner from './DayPlanner.jsx';
import NoPlan from './NoPlan.jsx';
import Location from './LocationTree.jsx';

//this component renders Location, NoPlan, which has the button to call PlanMyDay and the PlanMyDay Component
class Day extends React.Component {
  render() {
    if (!!localStorage.getItem('userToken') === false) {
      window.location.href = '/login';
      return false;
    } else {
      if (this.props.choices.zipCode === false) {
        return (
          <div>
            <Location />
          </div>
        );
      }
      return (
        <div>
          <div>
            <NoPlan />
          </div>
          <div>
            <DayPlanner />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    choices: state.choices,
  };
}

export default connect(mapStateToProps)(Day);
