import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Restaurant from './FirstLayer.jsx';

//import restaurant from './assets/treepics/Restaurant.jpeg';

class Tree extends React.Component {
  render (){
    return(
      <div>
       <img src='http://ifthedevilhadmenopause.com/wp-content/uploads/2014/08/sri-santrupti-restaurant-21346657591-1.png' height='150' onClick={this.changeView}/>
      </div>
    )
  }
}


export default Tree;