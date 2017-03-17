import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { planDay } from '../actions/index.jsx';

class NoPlan extends React.Component {
  render(){
    console.log('inNoPlan');
  return (
    <div>
      <iframe src="http://i.giphy.com/PtziVPCCEn6so.gif" width="480" height="391" frameBorder="0" className="gify"></iframe>
      <button onClick={() => this.props.planDay(this.props.choices.updatedZipcode)} className="btn btn-info btn-sm">Help!</button>
    </div>
   )
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

export default connect(mapStateToProps, mapDispatchToProps)(NoPlan);
