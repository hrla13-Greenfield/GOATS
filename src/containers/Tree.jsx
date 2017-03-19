import React from 'react';
import ReactDOM from 'react-dom';
import FirstLayer from './FirstLayer.jsx';
import Location from './LocationTree.jsx';
import Suggestion from './Suggestion.jsx'
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

//import restaurant from './assets/treepics/Restaurant.jpeg';

class Tree extends React.Component {
  render() {
    // console.log(!!localStorage.getItem("userToken"))
    if(!!localStorage.getItem("userToken") === false){
      window.location.href= "/login"
      return false;
    }else{
      console.log("there is a token")
    if (this.props.choices.zipCode === false) {
      return (
        <div>
          <Location />
        </div>
      )
    } else if (this.props.choices.finalSelection === false) {
      return (
        <div>
          <FirstLayer />
        </div>
      )
    } else {
      return (
        <div>
          <Suggestion />
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

export default connect(mapStateToProps)(Tree);
