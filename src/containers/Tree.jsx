import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FirstLayer from './FirstLayer.jsx';
import { Provider } from 'react-redux';

//import restaurant from './assets/treepics/Restaurant.jpeg';

class Tree extends React.Component {
  render (){
    return(
      <div>
       <FirstLayer />
      </div>
    )
  }
}


export default Tree;