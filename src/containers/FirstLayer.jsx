import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChoice } from '../actions/index.jsx';


class FirstLayer extends React.Component {

  renderChoices() {
    return this.props.choices.firstLoad.map((choice) => ( 
      <div className="col-md-4 col-sm-6 col-xs-12">
        <div className="space"></div>
        <h2>{choice.title}</h2>
        <img className="allPics"
          key={ choice.img }
          onClick={() => this.props.selectChoice(choice.option, this.props.choices.updatedZipcode, this.props.userdata.userID, this.props.userdata.username)}
          src={ choice.img } 
          style={{ borderRadius: 5, tintColor: '#0000CD' }}/></div>
      ));
  }

  render() {
    return (
      <div>
      <div className="spaceSmall"></div>
      <h2 className="headings">Click what you feel like</h2>
      <div className="space"></div>
      <div>
        { this.renderChoices() }</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    choices: state.choices,
    userdata: state.userdata,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectChoice }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstLayer);
