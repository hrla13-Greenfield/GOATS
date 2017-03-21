import React from 'react';
import { connect } from 'react-redux';
import { selectChoice, goBack } from '../actions/index.jsx';
import { bindActionCreators } from 'redux';

// this component renders the final suggestion coming from the yelp api call
// first Load is being updated to the action payload array items coming from yelp
class Suggestion extends React.Component {
  renderChoices() {
    return this.props.choices.firstLoad.map((choice, idx) => (
      <div key={idx} className="centered jumbotron suggestion">
        <h3 className="headings"> Here is what GOATS picked for you</h3>
        <div className="spaceSmall" />
        <h2 className="headingsW"> {choice.name} </h2>
        <div className="spaceSmall" />
        <div className="picCenter"><a href={choice.url}><img src={choice.image} height="300" /></a></div>
        <div className="spaceSmall" />
        <div className="headings"> Description:{choice.description.map((item, idx) => (<div key={idx}>{item.title}</div>))} </div>
        <div className="spaceSmall" />
        <div className="headings">Distance: {Math.round(choice.distance * 0.000621371 * 100) / 100} miles from you </div>
        <div className="spaceSmall" />
        <h6 className="headings">Phone: {choice.phone} </h6>
        <h6 className="headings">Address: {choice.address.map((item, idx) => (<div key={idx}>{item}</div>))} </h6>
        <div className="space" />
        <div className="center">
        {/*{//this function allows to go back to first layer to make a new choice in initialState}*/}
          <button onClick={(() => this.props.goBack())} className="inlineButton">Go Back</button>
        </div>
      </div>
      ));
  }

  render() {
    return (
      <div>
        <div className="col-sm-4">
          {this.renderChoices()}</div>
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
  return bindActionCreators({ goBack }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestion);
