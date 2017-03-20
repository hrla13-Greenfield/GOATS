import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { planDay } from '../actions/index.jsx';

class NoPlan extends React.Component {
  render(){
  return (
    <div className="gify">
     <div style={{width: '300px', height:'250px', overflow:'hidden', position:'center'}}>
      <iframe src="http://i.giphy.com/PtziVPCCEn6so.gif" width="480" height="391" frameBorder="0" className="gify"></iframe>
     </div>
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
