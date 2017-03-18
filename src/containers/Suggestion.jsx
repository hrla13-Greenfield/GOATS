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
        <h3> Do this:</h3>
         <div> { choice.name } </div>
         <div><a href={choice.url}><img src= { choice.image } height="300" /></a></div>
         <div>Phone: { choice.phone } </div>
         <h6> Description:{ choice.description.map((item) => ( <div>{item.title}</div>)) } </h6>
         <div>Distance: {Math.round(choice.distance * 0.000621371*100)/100} miles from you </div>
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