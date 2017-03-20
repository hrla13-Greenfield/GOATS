import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { planDay } from '../actions/index.jsx';

class NoPlan extends React.Component {
  render() {
    return (
      <div>
        <div className="buttonDiv">
          <button onClick={() => this.props.planDay(this.props.choices.updatedZipcode)} className="inlineButton">Help me plan my day</button>
        </div>
      </div>
    );
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

  //<div style={{ width: '250px', height: '210px', overflow: 'hidden', position: 'center', margin: '25px' }}>
  //<iframe src="https://i.giphy.com/PtziVPCCEn6so.gif" width="480" height="391" frameBorder="0" className="gify" />
  //</div>
