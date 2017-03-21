import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { planDay } from '../actions/index.jsx';

//this button calls the planDay function to render the new view for the day plan
class NoPlan extends React.Component {
  render() {
    return (
      <div>
        <div className="buttonDiv">
          <button onClick={() => this.props.planDay(this.props.choices.updatedZipcode)} className="inlineButton">Help me plan my day</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    choices: state.choices,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ planDay }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoPlan);
