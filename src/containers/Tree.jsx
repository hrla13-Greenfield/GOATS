import React from 'react';
import FirstLayer from './FirstLayer.jsx';
import Location from './LocationTree.jsx';
import Suggestion from './Suggestion.jsx';
import { connect } from 'react-redux';

//this component is rendered in the home path of the page and renders the part that asks 
//for location, as well as FirstLayer, onclick the respective second layer and Suggestion, 
//which makes the actual yelp api call
class Tree extends React.Component {
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
      } else if (this.props.choices.finalSelection === false) {
        return (
          <div>
            <FirstLayer />
          </div>
        );
      }
      return (
        <div>
          <Suggestion />
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


export default connect(mapStateToProps)(Tree);
