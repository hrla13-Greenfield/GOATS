import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { planDay } from '../actions/index.jsx';

var items;
var items2;
var items3;
var items4;
var items5;
var items6;

class DayPlanner extends React.Component {
  renderDay() {
      items = (this.props.choices.dayLoad.map((item) => {
        return (
          <div className="col-md-6 col-sm-12 col-xs-12 morning row-equal-height" height='300px'>
            <h4 className="headingBold orange"> {item.name} </h4>
            <div style={{width: '200px', height:'180px', overflow:'hidden'}}>
            <a href={item.url}><img src={item.image} height="180" /></a>
            </div>
            <div className="orange"> {Math.round(item.distance * 0.000621371 * 100) / 100} miles from you </div>
            <h6 className="orange"> Description:{ item.description.map((item) => ( <div>{item.title}</div>)) } </h6>
            <h6 className="orange"> {item.phone} </h6>
          </div>
        )
      }))
      items2 = (this.props.choices.dayLoadtwo.map((item) => {
        return (
          <div className="col-md-6 col-sm-12 col-xs-12 morning row-equal-height" height='300px'>
            <h4 className="headingBold orange"> {item.name} </h4>
            <div style={{width: '200px', height:'180px', overflow:'hidden'}}>
            <a href={item.url}><img src={item.image} height="180" /></a>
            </div>
            <div className="orange"> {Math.round(item.distance * 0.000621371 * 100) / 100} miles from you </div>
            <h6 className="orange"> Description:{ item.description.map((item) => ( <div>{item.title}</div>)) } </h6>
            <h6 className="orange"> {item.phone} </h6>
            
          </div>
        )
      }))
      items3 = (this.props.choices.dayLoadthree.map((item) => {
        return (
          <div className="col-md-6 col-sm-12 col-xs-12 afternoon row-equal-height" height='300px'>
            <h4 className="headingBold orange"> {item.name} </h4>
            <div style={{width: '200px', height:'180px', overflow:'hidden'}}>
            <a href={item.url}><img src={item.image} height="180" /></a>
            </div>
            <div className="orange"> {Math.round(item.distance * 0.000621371 * 100) / 100} miles from you </div>
            <h6 className="orange"> Description:{ item.description.map((item) => ( <div>{item.title}</div>)) } </h6>
            <h6 className="orange"> {item.phone} </h6>
          </div>
        )
      }))
      items4 = (this.props.choices.dayLoadfour.map((item) => {
        return (
          <div  className="col-md-6 col-sm-12 col-xs-12 afternoon row-equal-height" height='300px' >
            <h4 className="headingBold orange"> {item.name} </h4>
            <div style={{width: '200px', height:'180px', overflow:'hidden'}}>
            <a href={item.url}><img src={item.image} height="180" /></a>
            </div>
            <div className="orange"> {Math.round(item.distance * 0.000621371 * 100) / 100} miles from you </div>
            <h6 className="orange"> Description:{ item.description.map((item) => ( <div>{item.title}</div>)) } </h6>
            <h6 className="orange"> {item.phone} </h6>
          </div>
        )
      }))
      items5 = (this.props.choices.dayLoadfive.map((item) => {
        return (
          <div  className="col-md-6 col-sm-12 col-xs-12 night row-equal-height" height='300px'>
            <h4 className="headingBold orange"> {item.name} </h4>
            <div style={{width: '200px', height:'180px', overflow:'hidden'}}>
            <a href={item.url}><img src={item.image} height="180" /></a>
            </div>
            <div className="orange"> {Math.round(item.distance * 0.000621371 * 100) / 100} miles from you </div>
            <h6 className="orange"> Description:{ item.description.map((item) => ( <div>{item.title}</div>)) } </h6>
            <h6 className="orange"> {item.phone} </h6>
          </div>
        )
      }));
      items6 = (this.props.choices.dayLoadsix.map((item) => {
        return (
          <div  className="col-md-6 col-sm-12 col-xs-12 night row-equal-height" height='300px'>
            <h4 className="headingBold orange"> {item.name} </h4>
            <div style={{width: '200px', height:'180px', overflow:'hidden'}}>
            <a href={item.url}><img src={item.image} height="180" /></a>
            </div>
            <div className="orange"> {Math.round(item.distance * 0.000621371 * 100) / 100} miles from you </div>
            <h6 className="orange"> Description:{ item.description.map((item) => ( <div>{item.title}</div>)) } </h6>
            <h6 className="orange"> {item.phone} </h6>
          </div>
        )
      }));
  }
  render() {
    if (this.props.choices.dayLoadtwo !== undefined && this.props.choices.dayLoadthree !== undefined && this.props.choices.dayLoad !== undefined && this.props.choices.dayLoadfour !==undefined && this.props.choices.dayLoadfive !== undefined && this.props.choices.dayLoadsix !== undefined) {
      return (
        <div className="dayplanner">
          <div>{this.renderDay()}</div>
        <div> 
        <div className="space"></div>
          <div><h2 className="white">Morning</h2></div>
          <div>{items}</div>
          <div>{items2}</div>
        </div>
        <br/>
        <div className="space"></div>
        <div>
         <div className="space"></div>
         <div><h2 className="white">Afternoon</h2></div>
          <div>{items3}</div>
          <div>{items4}</div>
        </div>
        <br/>
        <div className="space"></div>
        <div>
         <div className="space"></div>
         <div><h2 className="white">Night</h2></div>
          <div>{items5}</div>
          <div>{items6}</div>
        </div>
      </div>
      );
    } else {
      return <div></div>
    }
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

