import React from 'react';
import { connect } from 'react-redux';

class Suggestion extends React.Component {
  renderChoices() {
    return this.props.choices.firstLoad.map(choice => (
      <div className="centered jumbotron suggestion">
        <h3 className="headings"> Here is what GOATS picked for you</h3>
        <div className="spaceSmall" />
        <h2 className="headingsW"> { choice.name } </h2>
        <div className="spaceSmall" />
        <div><a href={choice.url}>
          <img src={choice.image} height="300" className="picCenter" /></a></div>
        <div className="spaceSmall" />
        <div className="headings"> Description:{ choice.description.map(item => (
          <div>{item.title}</div>)) } </div>
        <div className="spaceSmall" />
        <div className="headings">Distance:
          {Math.round(choice.distance * 0.000621371 * 100) / 100} miles from you </div>
        <div className="spaceSmall" />
        <h6 className="headings">Phone: { choice.phone } </h6>
        <h6 className="headings">Address: { choice.address.map(item => (<div>{item}</div>)) } </h6>
      </div>
      ));
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
