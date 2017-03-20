import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChoice } from '../actions/index.jsx';


class FirstLayer extends React.Component {

  renderChoices() {
    return this.props.choices.firstLoad.map(choice => (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <div className="space" />
        <h2>{choice.title}</h2>
        <img
          className="allPics"
          key={choice.img}
          onClick={() => this.props.selectChoice(
            choice.option, this.props.choices.updatedZipcode,
            this.props.userdata.userID, this.props.userdata.username)}
          src={choice.img}
          style={{ borderRadius: 5, tintColor: '#0000CD' }}
        />
        <div className="space" /></div>
      ));
  }

  render() {
    return (
      <div>
        <div className="spaceSmall" />
        <h1 className="headings">Click what you feel like</h1>
        <h4 className="headingsW">Goats will help you make a decision</h4>
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
