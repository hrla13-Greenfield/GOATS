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
          <div>
            <div> {item.name} </div>
            <img src={item.image} height="250" />
            <div> {item.phone} </div>
            <div> {item.distance} </div>
          </div>
        )
      }))
      items2 = (this.props.choices.dayLoadtwo.map((item) => {
        return (
          <div>
            <div> {item.name} </div>
            <img src={item.image} height="250" />
            <div> {item.phone} </div>
            <div> {item.distance} </div>
          </div>
        )
      }))
      items3 = (this.props.choices.dayLoadthree.map((item) => {
        return (
          <div>
            <div> {item.name} </div>
            <img src={item.image} height="250" />
            <div> {item.phone} </div>
            <div> {item.distance} </div>
          </div>
        )
      }))
      items4 = (this.props.choices.dayLoadfour.map((item) => {
        return (
          <div>
            <div> {item.name} </div>
            <img src={item.image} height="250" />
            <div> {item.phone} </div>
            <div> {item.distance} </div>
          </div>
        )
      }))
      items5 = (this.props.choices.dayLoadfive.map((item) => {
        return (
          <div>
            <div> {item.name} </div>
            <img src={item.image} height="250" />
            <div> {item.phone} </div>
            <div> {item.distance} </div>
          </div>
        )
      }));
      items6 = (this.props.choices.dayLoadsix.map((item) => {
        return (
          <div>
            <div> {item.name} </div>
            <img src={item.image} height="250" />
            <div> {item.phone} </div>
            <div> {item.distance} </div>
          </div>
        )
      }));
  }
  render() {
    if (this.props.choices.dayLoadtwo !== undefined && this.props.choices.dayLoadthree !== undefined && this.props.choices.dayLoad !== undefined && this.props.choices.dayLoadfour !==undefined && this.props.choices.dayLoadfive !== undefined && this.props.choices.dayLoadsix !== undefined) {
      return (
        <div>
          <div>{this.renderDay()}</div>
          <div>{items}</div>
          <div>{items2}</div>
          <div>{items3}</div>
          <div>{items4}</div>
          <div>{items5}</div>
          <div>{items6}</div>
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

