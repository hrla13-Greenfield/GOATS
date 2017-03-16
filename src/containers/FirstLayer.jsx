import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChoice } from '../actions/index.jsx';


class FirstLayer extends React.Component {

  renderChoices() {
    return this.props.choices.firstLoad.map((choice) => ( 
        <div className="col-md-4 col-sm-6 col-xs-12">
          <img className="allPics"
          key={ choice.img }
          onClick={() => this.props.selectChoice(choice.option, this.props.choices.updatedZipcode, this.props.userdata.userID)}
          src={choice.img} 
          style={{borderRadius: 5, tintColor: '#0000CD' }}/></div>
      ));
  }

  render() {
    return (
      <div>
        { this.renderChoices() }</div>
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
