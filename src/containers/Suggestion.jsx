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
        <div className="centered">
        <h3 className="headings"> Here is what GoatBot picked for you</h3>
        <div className="spaceSmall"></div>
         <h2 className="headingsW"> { choice.name } </h2>
         <div className="spaceSmall"></div>
         <div><a href={choice.url}><img src= { choice.image } height="300" /></a></div>
         <div className="spaceSmall"></div>
         <div className="headings"> Description:{ choice.description.map((item) => ( <div>{item.title}</div>)) } </div>
         <div className="spaceSmall"></div>
         <div className="headings">Distance: {Math.round(choice.distance * 0.000621371*100)/100} miles from you </div>
         <div className="spaceSmall"></div>
         <h6 className="headings">Phone: { choice.phone } </h6>
         <h6 className="headings">Address: { choice.address.map((item) => (<div>{item}</div>)) } </h6>
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