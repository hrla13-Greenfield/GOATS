import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { selectChoice } from '../actions/index.jsx';
import { bindActionCreators } from 'redux';


class Suggestion extends React.Component {
  renderChoices () {
    console.log('props in renderChoices', this.props);
    return this.props.choices.firstLoad.map((choice) => {
      return (
        <div>
        <h3> Your suggestion:</h3>
         <div>Name: {choice.name } </div>
         <div>Activity: { choice.activity } </div>
      </div>
      );
    });
  }

render() {
    return (
      <div className="col-sm-4">
      { this.renderChoices() }</div>
    );
  }

}


function mapStateToProps(state) {
  return {
    choices: state.choices,
  };
}

export default connect(mapStateToProps)(Suggestion);