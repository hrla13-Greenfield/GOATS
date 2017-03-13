import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FirstLayer from './FirstLayer.jsx';
import Suggestion from './Suggestion.jsx'
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

//import restaurant from './assets/treepics/Restaurant.jpeg';



class Tree extends React.Component {
  render (){
    console.log('this.props', this.props);
    if (this.props.choices.finalSelection === false) {
    return(
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

 function mapStateToProps(state) {
    return {
      choices: state.choices,
    };
  }

export default connect(mapStateToProps)(Tree);

//export default Tree;