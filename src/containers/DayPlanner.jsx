import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { planDay } from '../actions/index.jsx';


class DayPlanner extends React.Component {
  render() {
    console.log('inDayplanner');
    console.log('this.props.choices.dayLoad', this.props.choices.dayLoad)
    var items = (this.props.choices.dayLoad.map((item) => {
      return(
      <div>
      <div>
       <div> { item.name } </div> 
       <img src={ item.image }/>
       <div> { item.phone } </div> 
       <div> { item.distance } </div>
      </div> 
      <div>
       <div> { item.name } </div> 
       <img src={ item.image }/>
       <div> { item.phone } </div> 
       <div> { item.distance } </div>
      </div> 
      <div>
       <div> { item.name } </div> 
       <img src={ item.image }/>
       <div> { item.phone } </div> 
       <div> { item.distance } </div>
      </div> 
      <div>
       <div> { item.name } </div> 
       <img src={ item.image }/>
       <div> { item.phone } </div> 
       <div> { item.distance } </div>
      </div> 
      <div>
       <div> { item.name } </div> 
       <img src={ item.image }/>
       <div> { item.phone } </div> 
       <div> { item.distance } </div>
      </div> 
      <div>
       <div> { item.name } </div> 
       <img src={ item.image }/>
       <div> { item.phone } </div> 
       <div> { item.distance } </div>
      </div> 
      </div>
     )
  }))
    console.log(items);
    return <div>{items}</div>
 }
}

function mapStateToProps(state) {
    return {
      choices: state.choices,
    };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ planDay }, dispatch);
  }


export default connect(mapStateToProps, mapDispatchToProps)(DayPlanner);

