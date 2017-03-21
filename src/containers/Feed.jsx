import React from 'react';
import Browse from './Browse.jsx';
import { connect } from 'react-redux';
import Location from './LocationTree.jsx';

//this is the parent component for Location and Browse component
class Feed extends React.Component {
  render() {
    if (!!localStorage.getItem('userToken') === false) {
      window.location.href = '/login';
      return false;
    }
    if (this.props.choices.zipCode === false) {
      return (
        <div>
          <Location />
        </div>
      );
    }
    return (
      <div>
        <Browse />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    choices: state.choices,
  };
}

export default connect(mapStateToProps)(Feed);
