import React from 'react';
import ReactDOM from 'react-dom';
import Browse from './Browse.jsx'
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import Location from './LocationTree.jsx';

class Feed extends React.Component {
  render(){
  if(!!localStorage.getItem("userToken") === false){
      window.location.href= "/#/login"
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
     <Browse />
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

export default connect(mapStateToProps)(Feed);